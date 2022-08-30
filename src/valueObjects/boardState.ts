export class BoardState {
    public squareIndex: number;
    public symbol: string;

    constructor(squareIndex: number, symbol: string) {
        this.squareIndex = squareIndex;
        this.symbol = symbol;
    }
}
