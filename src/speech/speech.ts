import { Howl, Howler } from "howler";

export class Speech {
  private readonly pathToLetterSounds = "./media/sounds/letters/";
  private sounds: Map<string, Howl>;

  constructor(letters: Array<string>) {
    this.sounds = new Map<string, Howl>();
    this.initializeSounds(letters);
  }

  public play(letter: string) {
    this.sounds.get(letter)?.play();
  }

  private initializeSounds(letters: Array<string>) {
    for (const letter of letters) {
      this.sounds.set(
        letter,
        new Howl({
          src: [
            this.pathToLetterSounds + letter + ".wav",
            this.pathToLetterSounds + letter + ".mp3",
          ],
        })
      );
    }
  }
}
