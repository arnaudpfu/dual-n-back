import { Component, ComponentProps } from 'solid-js';

interface BoardSquareProps extends ComponentProps<any> {
    index: number;
    targeted: boolean;
}

const BoardSquare: Component<BoardSquareProps> = (props: BoardSquareProps) => {
    let className = `square square-${props.index} ${props.targeted ? 'highlighted' : ''}`;

    return (
        <div class={className}>
            <div class={'inner-square'}></div>
        </div>
    );
};

export default BoardSquare;
