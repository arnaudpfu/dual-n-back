import { Howl } from 'howler';
import { Letter } from './constants';

export class Speech {
    private readonly pathToLetterSounds = '../assets/sounds/letters/';
    private sounds: Map<string, Howl>;

    constructor(letters: Letter[]) {
        this.sounds = new Map<Letter, Howl>();
        this.initializeSounds(letters);
    }

    public play(letter: Letter) {
        this.sounds.get(letter)?.play();
    }

    private initializeSounds(letters: Letter[]) {
        for (const letter of letters) {
            this.sounds.set(
                letter,
                new Howl({
                    src: [
                        this.pathToLetterSounds + letter + '.wav',
                        this.pathToLetterSounds + letter + '.mp3',
                    ],
                })
            );
        }
    }
}
