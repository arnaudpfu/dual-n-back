import { TbSpace } from 'solid-icons/tb';
import { Component, ComponentProps, Show } from 'solid-js';
import store from '../../store';
import './Board.scss';
import BoardSquare from './BoardSquare';

const Board: Component = () => {
    return (
        <div class="board-container">
            <div class="board">
                <div class="row">
                    <BoardSquare index={0}></BoardSquare>
                    <BoardSquare index={1}></BoardSquare>
                    <BoardSquare index={2}></BoardSquare>
                </div>
                <div class="row">
                    <BoardSquare index={3}></BoardSquare>
                    <BoardSquare index={4}></BoardSquare>
                    <BoardSquare index={5}></BoardSquare>
                </div>
                <div class="row">
                    <BoardSquare index={6}></BoardSquare>
                    <BoardSquare index={7}></BoardSquare>
                    <BoardSquare index={8}></BoardSquare>
                </div>
                <Show when={store.state.settings.displayTarget}>
                    <div class="center"></div>
                </Show>
            </div>
            <Show when={store.state.game === null}>
                <div class="keybindings-notice">
                    <div class="keybinding-line">
                        Press <strong>Space</strong> <TbSpace size={20} /> to Start / Cancel a Game.
                    </div>
                </div>
            </Show>
        </div>
    );
};

export default Board;
