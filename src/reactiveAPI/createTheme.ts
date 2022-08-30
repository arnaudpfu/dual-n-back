import { createEffect } from 'solid-js';

const toCSSVariableCase = (str: string): string => {
    return '--' + str.replaceAll('.', '-');
};

export const createTheme = (
    styleContainerID: string,
    theme: {
        [className: string]: string;
    }
): void => {
    createEffect(() => {
        let cssVariableDefinition = document.getElementById(styleContainerID);

        if (cssVariableDefinition === null) {
            cssVariableDefinition = document.createElement('style');
            cssVariableDefinition.id = styleContainerID;
            document.head.insertBefore(cssVariableDefinition, document.head.querySelector('style'));
        }

        let themeColors = '';

        for (const colorName in theme) {
            const color = theme[colorName];
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
