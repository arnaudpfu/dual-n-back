import { Component, Show } from 'solid-js';
import Board from './components/Board';
import Topbar from './components/Topbar';
import './App.scss';
import Footer from './components/Footer';
import { createTheme } from './reactiveAPI/createTheme';
import ListenersSetup from './components/utils/ListenersSetup';
import store from './store';
import UserMatchNotice from './components/utils/UserMatchNotice';
import { StoreGame } from './store/StoreGame';
import { DefaultDrakTheme } from './themes/DefaultDark';

const VARIABLE_CONTAINER_DEFINITION_ID = 'app-css-variable-definition';

const App: Component = () => {
    createTheme(VARIABLE_CONTAINER_DEFINITION_ID, DefaultDrakTheme);

    return (
        <div
            class="app-container"
            classList={{
                playing: store.state.game !== null,
            }}
        >
            <div class="app">
                <Show when={store.state.game === null}>
                    <Topbar />
                </Show>
                <Board />
                <Show when={store.state.game === null}>
                    <Footer />
                </Show>
                <Show when={store.state.game !== null}>
                    <div class="trials-notice">{store.state.boardState.currentTrials}</div>
                    <UserMatchNotice />
                </Show>
                {/* <ErrorBoundary fallback={}> */}
                <ListenersSetup />
                {/* </ErrorBoundary> */}
            </div>
        </div>
    );
};

export default App;
