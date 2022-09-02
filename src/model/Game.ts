import { GameHistory, Matches, MatchRecap } from './GameHistory';
import { Match } from './Match';
import { UserInput } from './enums/userInput';
import { GameResult } from '../store/GameResult';
import { BoardState } from '../store';
import { Letter, LETTERS } from './constants';

/**
 * Indicate if match failed or is a success.
 * Empty means nothing happened.
 */
export type ResultMatch = {
    [type in keyof Matches]?: keyof MatchRecap;
};

export class Game {
    private readonly randomnessPercentageTreshold: number = 35;
    private readonly positionRandomTreshold: number = 0.4;
    private readonly audioRandomTreshold: number = 0.8;

    private n: number;
    private gameHistory: GameHistory;
    private gameLength: number;
    private intervalTime: number;
    private restDelay: number;

    private _isGameInProgress: boolean;
    private _playerChoice: Match | null;
    private _currentState: BoardState | null;
    private _currentMatch: ResultMatch | null;
    private _currentIteration: number;

    private onStateChanged: (boardState: BoardState) => void;
    private onPlayerChoiceValidated: (match: ResultMatch) => void;
    private onGameEnded: (gameResult: GameResult) => void;

    get currentState(): BoardState | null {
        return this._currentState;
    }

    set currentState(newState: BoardState | null) {
        if (newState === null) return;
        this._currentState = newState;
        this.onStateChanged(newState);
        this.gameHistory.addState(newState);
    }

    get currentMatch(): ResultMatch | null {
        return this._currentMatch;
    }

    set currentMatch(match: ResultMatch | null) {
        if (match === null) return;
        this._currentMatch = match;
        this.onPlayerChoiceValidated(match);

        if (match.position) this.gameHistory.addMatch('position', match.position);
        if (match.sound) this.gameHistory.addMatch('sound', match.sound);
    }

    get isGameInProgress(): boolean {
        return this._isGameInProgress;
    }

    constructor(
        n: number,
        gameLength: number,
        intervalTime: number,
        restDelay: number,
        onStateChanged: (boardState: BoardState) => void = () => undefined,
        onPlayerChoiceValidated: (match: ResultMatch) => void = () => undefined,
        onGameEnded: (gameResult: GameResult) => void = () => undefined
    ) {
        this.n = n;
        this.gameHistory = new GameHistory();
        this.gameLength = gameLength;
        this.intervalTime = intervalTime;
        this.restDelay = restDelay;
        this.onStateChanged = onStateChanged;
        this.onPlayerChoiceValidated = onPlayerChoiceValidated;
        this.onGameEnded = onGameEnded;

        this._isGameInProgress = false;
        this._playerChoice = null;
        this._currentState = null;
        this._currentMatch = null;
        this._currentIteration = 0;
    }

    public async start(): Promise<void> {
        this._isGameInProgress = true;
        this.resetChoice();
        this.gameHistory.reset();

        this._currentIteration = 0;
        while (this._currentIteration < this.gameLength && this._isGameInProgress) {
            await this.executeDelayed(this.restDelay, this.generateState.bind(this));
            await this.executeDelayed(this.intervalTime, this.processChoice.bind(this));
            this._currentIteration++;
        }

        if (this._isGameInProgress) {
            this._isGameInProgress = false;
            this.onGameEnded(this.getGameResult());
        }
    }

    public stop(): void {
        this._isGameInProgress = false;
    }

    public addChoice(input: UserInput) {
        if (
            !this._isGameInProgress ||
            this.gameHistory.boardStates.length < 1 ||
            this.gameHistory.boardStates.length > this.gameLength
        ) {
            return;
        }

        if (this._playerChoice == null) this._playerChoice = new Match(false, false);

        if (input === UserInput.Audio && !this._playerChoice.soundMatch) {
            this._playerChoice.soundMatch = true;
        }
        if (input === UserInput.Position && !this._playerChoice.positionMatch) {
            this._playerChoice.positionMatch = true;
        }
    }

    private async executeDelayed(delayMs: number, fn: () => void) {
        await this.delay(delayMs).then(fn);
    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, milliseconds)
        );
    }

    private processChoice(): void {
        if (this._playerChoice == null) this._playerChoice = new Match(false, false);
        this.gameHistory.addChoice(this._playerChoice);
        this.validateChoice();
        this.resetChoice();
    }

    private isPositionBoardMatch(): boolean {
        const currentIndex = this.gameHistory.boardStates.length - 1;
        return (
            this.gameHistory.boardStates[currentIndex].positionIndex ===
            this.gameHistory.boardStates[currentIndex - this.n].positionIndex
        );
    }

    private isSoundBoardMatch(): boolean {
        const currentIndex = this.gameHistory.boardStates.length - 1;
        return (
            this.gameHistory.boardStates[currentIndex].letter ===
            this.gameHistory.boardStates[currentIndex - this.n].letter
        );
    }

    private validateChoice(): void {
        if (this._playerChoice === null) return;

        const match: ResultMatch = {};
        const { positionMatch: positionChoiced, soundMatch: soundChoiced } = this._playerChoice;

        if (this.gameHistory.boardStates.length <= this.n) {
            if (positionChoiced) match.position = 'failed';
            if (soundChoiced) match.sound = 'failed';
        } else {
            const positionMatched = this.isPositionBoardMatch();
            const soundMatched = this.isSoundBoardMatch();
            if (positionMatched || positionChoiced) {
                match.position = positionMatched === positionChoiced ? 'success' : 'failed';
            }
            if (soundMatched || soundChoiced) {
                match.sound = soundMatched === soundChoiced ? 'success' : 'failed';
            }
        }

        this.currentMatch = match;
    }

    private getGameResult(): GameResult {
        return new GameResult(this.gameHistory.matches.sound, this.gameHistory.matches.position);
    }

    private resetChoice() {
        this._playerChoice = null;
    }

    /**
     * By default, randomly generated states are matching only rarely, which makes it easy to get over 80%
     * without user interaction.
     * To increase the match percentage, we are checking previous states and if the percentage of matches of previous states
     * is below the specified treshold, the newly generated state will be only partly random, or not random at all.
     * It will have the same position, audio or both of a 'n-previous' state.
     **/
    private getMatchPercentage(): number {
        let boardStates = this.gameHistory.boardStates;
        if (boardStates.length < this.n) return 100;

        let matches = 0;
        for (let i = this.n; i < boardStates.length; i++) {
            if (boardStates[i].positionIndex === boardStates[i - this.n].positionIndex) matches++;
            if (boardStates[i].letter === boardStates[i - this.n].letter) matches++;
        }
        return (matches / boardStates.length / 2) * 100;
    }

    private generatePseudoRandomState(): BoardState {
        let randomValue = Math.random();
        let nPreviousBoardState = this.gameHistory.boardStates[this.gameHistory.boardStates.length - this.n];
        // previous position
        if (randomValue < this.positionRandomTreshold) {
            return {
                positionIndex: nPreviousBoardState.positionIndex,
                letter: this.getRandomLetter(),
                currentTrials: this.gameLength - this._currentIteration,
            };

            // previous letter
        } else if (randomValue < this.audioRandomTreshold) {
            return {
                positionIndex: this.getRandomPosition(),
                letter: nPreviousBoardState.letter,
                currentTrials: this.gameLength - this._currentIteration,
            };
            // previous position and letter
        } else {
            return {
                positionIndex: nPreviousBoardState.positionIndex,
                letter: nPreviousBoardState.letter,
                currentTrials: this.gameLength - this._currentIteration,
            };
        }
    }

    /**
     * Generate a new state according the **randomnessPercentageTreshold** variable.
     */
    private generateState(): void {
        if (
            this.gameHistory.boardStates.length >= this.n &&
            this.getMatchPercentage() < this.randomnessPercentageTreshold
        ) {
            this.currentState = this.generatePseudoRandomState();
        } else {
            this.currentState = {
                positionIndex: this.getRandomPosition(),
                letter: this.getRandomLetter(),
                currentTrials: this.gameLength - this._currentIteration,
            };
        }
    }

    private getRandomPosition(): number {
        return Math.floor(Math.random() * 9);
    }

    private getRandomLetter(): Letter {
        return LETTERS[Math.floor(Math.random() * LETTERS.length)];
    }
}
