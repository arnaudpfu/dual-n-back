import { BoardState } from "../valueObjects/boardState";
import { Match } from "./match";

export class GameHistory {

    public boardStates:Array<BoardState>;
    public playerChoices:Array<Match>;
    public matches:Array<Match>;

    constructor() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = [];
    }

    public addState(boardState:BoardState) {
        this.boardStates.push(boardState);
    }

    public addChoice(playerChoice:Match) {
        this.playerChoices.push(playerChoice);
    }

    public addMatch(match:Match) {
        this.matches.push(match);
    }

    public reset() {
        this.boardStates = [];
        this.playerChoices = [];
        this.matches = [];
    }
}
