export class GameResult {
    public trialsCount: number;
    public audioMatchCount: number;
    public positionMatchCount: number;

    constructor(trialsCount: number, audioMatchCount: number, positionMatchCount: number) {
        this.trialsCount = trialsCount;
        this.audioMatchCount = audioMatchCount;
        this.positionMatchCount = positionMatchCount;
    }

    public get audioMatchPercentage(): number {
        return Math.round((this.audioMatchCount / this.trialsCount) * 1000) / 10;
    }

    public get positionMatchPercentage(): number {
        return Math.round((this.positionMatchCount / this.trialsCount) * 1000) / 10;
    }

    public get generalMatchPercentage(): number {
        return (
            Math.round(((this.audioMatchCount + this.positionMatchCount) / this.trialsCount / 2) * 1000) / 10
        );
    }

    public get audioMissCount(): number {
        return this.trialsCount - this.audioMatchCount;
    }

    public get positionMissCount(): number {
        return this.trialsCount - this.positionMatchCount;
    }
}
