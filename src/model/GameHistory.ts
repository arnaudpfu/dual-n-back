import { BoardState } from '../store';
import { Match } from './Match';

export interface MatchRecap {
    success: number;
    failed: number;
}

export interface Matches {
    position: MatchRecap;
    sound: MatchRecap;
}

export class GameHistory {
    /**
     * Length of the game.
     */
    public boardStates: BoardState[];
    /**
     * Length of the game.
     */
    public playerChoices: Match[];
    /**
     * Length depends on playerChoices and game matches.
     */
    public matches: Matches;

    constructor() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = {
            position: {
                success: 0,
                failed: 0,
            },
            sound: {
                success: 0,
                failed: 0,
            },
        };
    }

    public addState(boardState: BoardState) {
        this.boardStates.push(boardState);
    }

    public addChoice(playerChoice: Match) {
        this.playerChoices.push(playerChoice);
    }

    public addMatch(type: keyof Matches, result: keyof MatchRecap) {
        this.matches[type][result]++;
    }

    public reset() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = {
            position: {
                success: 0,
                failed: 0,
            },
            sound: {
                success: 0,
                failed: 0,
            },
        };
    }
}
