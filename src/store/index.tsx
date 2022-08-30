import { createRoot } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';
import { StoreGame } from './StoreGame';
import { GameResult } from './GameResult';
import { Speech } from '../model/Speech';
import { Letter, LETTERS } from '../model/constants';
import { ButtonState } from '../model/enums/buttonState';

export interface BoardState {
    positionIndex: number;
    letter: Letter;
    currentTrials: number;
}

export interface State {
    /**
     * Results got during the session.
     */
    results: GameResult[];
    speech: Speech;
    btns: {
        audio: `${ButtonState}`;
        position: `${ButtonState}`;
    };
    /**
     * Active game.
     */
    game: StoreGame | null;
    boardState: Omit<BoardState, 'letter'> & { letter: null | Letter };
    /**
     * Dual n back settings.
     */
    settings: {
        level: number;
        trials: number;
        intervalTime: number;
        restDelay: number;
        activeFeedback: boolean;
        displayTrials: boolean;
        displayTarget: boolean;
        useFullScreen: boolean;
    };
}

type Store = {
    state: State;
    set: SetStoreFunction<State>;
};

const defaultState: State = {
    results: [],
    game: null,
    speech: new Speech(LETTERS),
    btns: {
        audio: ButtonState.None,
        position: ButtonState.None,
    },
    boardState: {
        positionIndex: -1,
        letter: null,
        currentTrials: -1,
    },
    settings: {
        level: 5,
        trials: 35,
        intervalTime: 3000,
        restDelay: 300,
        activeFeedback: false,
        displayTrials: true,
        displayTarget: true,
        useFullScreen: true,
    },
};

const store = createRoot<Store>(() => {
    const [state, setState] = createStore(defaultState);

    return {
        state,
        set: setState,
    };
});

export default store;
