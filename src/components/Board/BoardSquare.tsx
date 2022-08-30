import { Component, ComponentProps } from 'solid-js';
import store from '../../store';

interface BoardSquareProps extends ComponentProps<any> {
    index: number;
}

const BoardSquare: Component<BoardSquareProps> = (props: BoardSquareProps) => {
    return (
        <div
            class={`square square-${props.index}`}
            classList={{
                highlighted: props.index === store.state.boardState.positionIndex,
            }}
        >
            <div class={'inner-square'} style="color:white"></div>
        </div>
    );
};

export default BoardSquare;
