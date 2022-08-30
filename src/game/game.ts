import { GameHistory } from './gameHistory';
import { BoardState } from '../valueObjects/boardState';
import { Match } from './match';
import { UserInput } from '../enums/userInput';
import { Board } from '../components/Board';
import { GameResult } from '../valueObjects/gameResult';

export class Game {
    private readonly displayResultDelay: number = 500;
    private readonly randomnessPercentageTreshold: number = 35;
    private readonly positionRandomTreshold: number = 0.4;
    private readonly audioRandomTreshold: number = 0.8;

    private n: number;
    private gameHistory: GameHistory;
    private gameLength: number;
    private intervalTime: number;
    /**
     * Array of letters (name of sound files without extension).
     */
    private symbols: Array<string>;

    private isGameInProgress: boolean = false;
    private playerChoice: Match | null;
    private _currentState: BoardState | null;
    private _currentMatch: Match | null;
    private _currentIteration: number;

    private onStateChanged: (BoardState) => void;
    private onPlayerChoiceValidated: (Match) => void;
    private onGameEnded: (GameResult) => void;

    get currentState(): BoardState | null {
        return this._currentState;
    }

    set currentState(newState: BoardState | null) {
        if (newState === null) return;
        this._currentState = newState;
        this.onStateChanged(newState);
        this.gameHistory.addState(newState);
    }

    get currentMatch(): Match | null {
        return this._currentMatch;
    }

    set currentMatch(match: Match | null) {
        if (match === null) return;
        this._currentMatch = match;
        this.onPlayerChoiceValidated(match);
        this.gameHistory.addMatch(match);
    }

    get currentIteration(): number {
        return this._currentIteration;
    }

    constructor(
        n: number,
        gameLength: number,
        intervalTime: number,
        symbols: Array<string>,
        onStateChanged: (BoardState) => void = () => undefined,
        onPlayerChoiceValidated: (Match) => void = () => undefined,
        onGameEnded: (GameResult) => void = () => undefined
    ) {
        this.n = n;
        this.gameHistory = new GameHistory();
        console.log(this.gameHistory);
        this.gameLength = gameLength;
        this.intervalTime = intervalTime;
        this.symbols = symbols;
        this.onStateChanged = onStateChanged;
        this.onPlayerChoiceValidated = onPlayerChoiceValidated;
        this.onGameEnded = onGameEnded;

        this.playerChoice = null;
        this._currentState = null;
        this._currentMatch = null;
        this._currentIteration = 0;
    }

    public async start(): Promise<void> {
        this.isGameInProgress = true;
        this.resetChoice();
        this.gameHistory.reset();

        this._currentIteration = 0;
        console.log(this._currentIteration < this.gameLength && this.isGameInProgress);
        while (this._currentIteration < this.gameLength && this.isGameInProgress) {
            await this.executeDelayed(this.displayResultDelay, this.generateState.bind(this));
            await this.executeDelayed(this.intervalTime, this.processChoice.bind(this));
            this._currentIteration++;
        }

        if (this.isGameInProgress) {
            this.isGameInProgress = false;
            this.onGameEnded(this.getGameResult());
        }
    }

    public cancel(): void {
        this.isGameInProgress = false;
    }

    public addChoice(input: UserInput) {
        if (
            !this.isGameInProgress ||
            this.gameHistory.boardStates.length < 1 ||
            this.gameHistory.boardStates.length >= this.gameLength
        ) {
            return;
        }

        if (this.playerChoice == null) this.playerChoice = new Match(false, false);

        if (input == UserInput.Audio && !this.playerChoice.soundMatch) this.playerChoice.soundMatch = true;
        if (input == UserInput.Position && !this.playerChoice.positionMatch)
            this.playerChoice.positionMatch = true;
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
        if (this.playerChoice == null) this.playerChoice = new Match(false, false);
        this.gameHistory.addChoice(this.playerChoice);
        this.validateChoice();
        this.resetChoice();
    }

    private validateChoice(): void {
        if (this.playerChoice === null) return;

        let audioMatch = false,
            positionMatch = false;
        if (this.gameHistory.boardStates.length <= this.n) {
            positionMatch = !this.playerChoice.positionMatch;
            audioMatch = !this.playerChoice.soundMatch;
            this.currentMatch = new Match(positionMatch, audioMatch);
        } else {
            let currentIndex = this.gameHistory.boardStates.length - 1;
            positionMatch =
                this.playerChoice.positionMatch ===
                (this.gameHistory.boardStates[currentIndex].squareIndex ===
                    this.gameHistory.boardStates[currentIndex - this.n].squareIndex);
            audioMatch =
                this.playerChoice.soundMatch ===
                (this.gameHistory.boardStates[currentIndex].symbol ===
                    this.gameHistory.boardStates[currentIndex - this.n].symbol);
            this.currentMatch = new Match(positionMatch, audioMatch);
        }
    }

    private getGameResult(): GameResult {
        let audioMatches: number = 0;
        let positionMatches: number = 0;
        for (let match of this.gameHistory.matches) {
            if (match.soundMatch) audioMatches++;

            if (match.positionMatch) positionMatches++;
        }
        return new GameResult(this.gameLength, audioMatches, positionMatches);
    }

    private resetChoice() {
        this.playerChoice = null;
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
            if (boardStates[i].squareIndex === boardStates[i - this.n].squareIndex) matches++;
            if (boardStates[i].symbol === boardStates[i - this.n].symbol) matches++;
        }
        return (matches / boardStates.length / 2) * 100;
    }

    private generatePseudoRandomState(): BoardState {
        let randomValue = Math.random();
        let nPreviousBoardState = this.gameHistory.boardStates[this.gameHistory.boardStates.length - this.n];
        // previous position
        if (randomValue < this.positionRandomTreshold)
            return new BoardState(nPreviousBoardState.squareIndex, this.getRandomSymbol());
        // previous symbol
        else if (randomValue < this.audioRandomTreshold)
            return new BoardState(this.getRandomPosition(), nPreviousBoardState.symbol);
        // previous position and symbol
        else return new BoardState(nPreviousBoardState.squareIndex, nPreviousBoardState.symbol);
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
            this.currentState = new BoardState(this.getRandomPosition(), this.getRandomSymbol());
        }
    }

    private getRandomPosition(): number {
        return Math.floor(Math.random() * 9);
    }

    private getRandomSymbol(): string {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }
}
