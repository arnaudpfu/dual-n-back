import { Component, ComponentProps } from 'solid-js';
import { createKeydownListener } from '../../reactiveAPI/createKeydownListener';

const ListenersSetup: Component = () => {
    createKeydownListener();
    return null;
};

export default ListenersSetup;
