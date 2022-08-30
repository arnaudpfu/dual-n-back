import { Component, createEffect } from 'solid-js';
import Board from './components/Board';
import Topbar from './components/Topbar';
import * as defaultDarkTheme from './themes/default-dark.json';
import './App.scss';
import Footer from './components/Footer';

const VARIABLE_CONTAINER_DEFINITION_ID = 'app-css-variable-definition';

const toCSSVariableCase = (str: string): string => {
    return '--' + str.replaceAll('.', '-');
};

const App: Component = () => {
    createEffect(() => {
        let cssVariableDefinition = document.getElementById(VARIABLE_CONTAINER_DEFINITION_ID);

        if (cssVariableDefinition === null) {
            cssVariableDefinition = document.createElement('style');
            cssVariableDefinition.id = VARIABLE_CONTAINER_DEFINITION_ID;
            document.head.insertBefore(cssVariableDefinition, document.head.querySelector('style'));
        }

        let themeColors = '';

        for (const colorName in defaultDarkTheme) {
            const color = defaultDarkTheme[colorName];
            if (typeof color === 'string') {
                const cssColorName = toCSSVariableCase(colorName);
                themeColors += cssColorName + ': ' + color + ';\n';
            }
        }

        cssVariableDefinition.innerHTML = `
        :root {
            ${themeColors}
        }
        `;
    });

    return (
        <div class="app-container">
            <div class="app">
                <Topbar />
                <Board targetedIndex={-1} />
                <Footer />
            </div>
        </div>
    );
};

export default App;
