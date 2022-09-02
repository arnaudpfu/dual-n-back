import { produce } from 'solid-js/store';
import { Game, ResultMatch } from '../model/Game';
import store, { BoardState } from '.';
import { Match } from '../model/Match';
import { GameResult } from './GameResult';
import { UserInput } from '../model/enums/userInput';
import { ButtonState } from '../model/enums/buttonState';

/**
 * Link Game class to the store.
 */
export class StoreGame extends Game {
    constructor() {
        if (store.state.game !== null) throw new Error('Game is already defined');
        super(
            store.state.settings.level,
            store.state.settings.trials,
            store.state.settings.intervalTime,
            store.state.settings.restDelay,
            StoreGame.onBoardStateChange,
            StoreGame.onPlayerChoiceValidated,
            StoreGame.onGameEnded
        );

        if (store.state.settings.useFullScreen) {
            document.body.requestFullscreen();
        }
        this.start();
        store.set(
            produce((previous) => {
                previous.game = this;
                previous.results.last = null;
                previous.boardState.currentTrials = previous.settings.trials;
            })
        );
    }

    public cancel(): void {
        if (store.state.settings.useFullScreen) {
            document.exitFullscreen();
        }
        store.state.game?.stop();
        store.set(
            produce((previous) => {
                previous.game = null;
                previous.boardState = { positionIndex: -1, letter: null, currentTrials: -1 };
            })
        );
    }

    public selectAudio(): void {
        if (!store.state.game?.isGameInProgress) return;
        store.state.game.addChoice(UserInput.Audio);
        store.set('btns', 'audio', ButtonState.Pressed);
    }

    public selectPosition(): void {
        if (!store.state.game?.isGameInProgress) return;
        store.state.game.addChoice(UserInput.Position);
        store.set('btns', 'position', ButtonState.Pressed);
    }

    public static onBoardStateChange = (boardState: BoardState) => {
        store.set(
            produce((previous) => {
                previous.boardState.positionIndex = boardState.positionIndex;
                previous.boardState.currentTrials = boardState.currentTrials;
            })
        );
        store.state.speech.play(boardState.letter);
        setTimeout(() => {
            store.set('boardState', 'positionIndex', -1);
        }, 1000);
    };

    public static onPlayerChoiceValidated = (match: ResultMatch) => {
        store.set(
            produce((previous) => {
                previous.btns = {
                    audio: match.sound
                        ? match.sound === 'success'
                            ? ButtonState.Success
                            : ButtonState.Error
                        : ButtonState.None,

                    position: match.position
                        ? match.position === 'success'
                            ? ButtonState.Success
                            : ButtonState.Error
                        : ButtonState.None,
                };
            })
        );
        setTimeout(() => {
            store.set(
                produce((previous) => {
                    previous.btns = {
                        audio: ButtonState.None,
                        position: ButtonState.None,
                    };
                })
            );
        }, 500);
    };

    public static onGameEnded = (gameResult: GameResult) => {
        document.exitFullscreen();
        store.set(
            produce((previous) => {
                previous.results.all.push(gameResult);
                previous.results.last = gameResult;
                previous.game = null;
            })
        );
    };
}
