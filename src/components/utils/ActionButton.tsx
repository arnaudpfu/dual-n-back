import { Component, ComponentProps, createMemo } from 'solid-js';
import { ButtonState } from '../../model/enums/buttonState';
import store from '../../store';

interface ActionButtonProps extends ComponentProps<'div'> {
    type: 'position' | 'audio';
}

const keys = {
    position: 'A',
    audio: 'L',
};

const ActionButton: Component<ActionButtonProps> = (props: ActionButtonProps) => {
    let stateClass = createMemo(() => {
        return store.state.btns[props.type];
    });

    // if (
    //     !store.state.settings.activeFeedback &&
    //     (stateClass === ButtonState.Error || stateClass === ButtonState.Success)
    // ) {
    //     stateClass = ButtonState.None;
    // }

    return (
        <div class="keybindings-notice">
            <div class={`keybinding-line user-match-notice ${stateClass()}`}>
                <strong>{keys[props.type]}</strong> - match {props.type}
            </div>
        </div>
    );
};

export default ActionButton;
