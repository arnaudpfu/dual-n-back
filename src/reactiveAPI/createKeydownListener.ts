import { produce } from 'solid-js/store';
import { createEffect, onCleanup } from 'solid-js';
import { StoreGame } from '../store/StoreGame';
import store from '../store';

export const createKeydownListener = () => {
    createEffect(() => {
        const handleKeydown = (e: KeyboardEvent): void => {
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
                case 'ArrowDown':
                    e.preventDefault();
                    store.set('settings', 'level', (l) => (l > 2 ? l - 1 : l));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    store.set(
                        produce((previous) => {
                            const t = previous.settings.trials;
                            const l = previous.settings.level;
                            previous.settings.level = l + 1;
                            previous.settings.trials = Math.max((l + 1) * 2, t);
                        })
                    );
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    store.set('settings', 'trials', (t) => (t > store.state.settings.level * 2 ? t - 1 : t));
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    store.set('settings', 'trials', (t) => t + 1);
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
