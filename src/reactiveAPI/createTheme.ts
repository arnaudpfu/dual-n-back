import { applyInlineStyntax, toCSSVariableCase } from './../themes/config';
import { createEffect } from 'solid-js';
import { completeTheme, Theme } from '../themes/config';

export const createTheme = (styleContainerID: string, theme: Theme): void => {
    createEffect(() => {
        let cssVariableDefinition = document.getElementById(styleContainerID);

        if (cssVariableDefinition === null) {
            cssVariableDefinition = document.createElement('style');
            cssVariableDefinition.id = styleContainerID;
            document.head.insertBefore(cssVariableDefinition, document.head.querySelector('style'));
        }

        let themeColors = '';
        const inlineTheme = applyInlineStyntax(completeTheme(theme));

        for (const colorName in inlineTheme) {
            const color = inlineTheme[colorName];
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
};
