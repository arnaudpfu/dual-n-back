import { BoardState } from '../store';
import { Match } from './Match';

export class GameHistory {
    public boardStates: BoardState[];
    public playerChoices: Match[];
    public matches: Match[];

    constructor() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = [];
    }

    public addState(boardState: BoardState) {
        this.boardStates.push(boardState);
    }

    public addChoice(playerChoice: Match) {
        this.playerChoices.push(playerChoice);
    }

    public addMatch(match: Match) {
        this.matches.push(match);
    }

    public reset() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = [];
    }
}
