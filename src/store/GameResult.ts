import { MatchRecap } from '../model/GameHistory';

export class GameResult {
    public audioRecap: MatchRecap;
    public positionRecap: MatchRecap;
    public audioCount: number;
    public positionCount: number;

    constructor(audioRecap: MatchRecap, positionRecap: MatchRecap) {
        this.audioRecap = audioRecap;
        this.positionRecap = positionRecap;
        this.audioCount = this.audioRecap.failed + this.audioRecap.success;
        this.positionCount = this.positionRecap.failed + this.positionRecap.success;
    }

    public get audioMatchPercentage(): number {
        const audioPerc = Math.round((this.audioRecap.success / this.audioCount) * 1000) / 10;
        return audioPerc || 0;
    }

    public get positionMatchPercentage(): number {
        const positionPerc = Math.round((this.positionRecap.success / this.positionCount) * 1000) / 10;
        return positionPerc || 0;
    }

    public get generalMatchPercentage(): number {
        const genPerc =
            Math.round(
                ((this.audioRecap.success + this.positionRecap.success) /
                    (this.audioCount + this.positionCount)) *
                    1000
            ) / 10;
        return genPerc || 0;
    }

    public get audioMissCount(): number {
        return this.audioRecap.failed;
    }

    public get positionMissCount(): number {
        return this.positionRecap.failed;
    }
}
