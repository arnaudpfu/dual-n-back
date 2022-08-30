import { TbSpace } from 'solid-icons/tb';
import { Component, ComponentProps } from 'solid-js';
import './Board.scss';
import BoardSquare from './BoardSquare';

interface BoardProps extends ComponentProps<any> {
    targetedIndex: number;
}

const Board: Component<BoardProps> = (props: BoardProps) => {
    const isTargeted = (index: number): boolean => {
        return props.targetedIndex == index;
    };

    return (
        <div class="board-container">
            <div class="board">
                <div class="row">
                    <BoardSquare index={0} targeted={isTargeted(0)}></BoardSquare>
                    <BoardSquare index={1} targeted={isTargeted(1)}></BoardSquare>
                    <BoardSquare index={2} targeted={isTargeted(2)}></BoardSquare>
                </div>
                <div class="row">
                    <BoardSquare index={3} targeted={isTargeted(3)}></BoardSquare>
                    <BoardSquare index={4} targeted={isTargeted(4)}></BoardSquare>
                    <BoardSquare index={5} targeted={isTargeted(5)}></BoardSquare>
                </div>
                <div class="row">
                    <BoardSquare index={6} targeted={isTargeted(6)}></BoardSquare>
                    <BoardSquare index={7} targeted={isTargeted(7)}></BoardSquare>
                    <BoardSquare index={8} targeted={isTargeted(8)}></BoardSquare>
                </div>
                <div class="center"></div>
            </div>
            <div class="keybindings-notice">
                <div class="keybinding-line">
                    Press <strong>Space</strong> <TbSpace size={20} /> to Start / Cancel a Game.
                </div>
            </div>
        </div>
    );
};

export default Board;
