import { createEffect, onCleanup } from 'solid-js';
import { StoreGame } from '../store/StoreGame';
import store from '../store';

export const createKeydownListener = () => {
    createEffect(() => {
        const handleKeydown = (e: KeyboardEvent): void => {
            console.log(e.key);
            switch (e.key) {
                case 'l':
                    e.preventDefault();
                    if (store.state.game) {
                        store.state.game.selectAudio();
                    }
                    break;
                case 'a':
                    e.preventDefault();
                    if (store.state.game) {
                        store.state.game.selectPosition();
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    if (store.state.game) {
                        store.state.game.cancel();
                    } else {
                        store.set('game', new StoreGame());
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeydown);
        onCleanup(() => {
            document.removeEventListener('keydown', handleKeydown);
        });
    });
};
