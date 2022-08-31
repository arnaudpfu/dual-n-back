export interface Theme {
    background: string;
    border: string;
    primary: string;
    btnSuccess?: string;
    btnError?: string;
    btnPressed?: string;
    text: {
        foreground: string;
        background: string;
    };
    board: {
        background?: string;
        border?: string;
        borderStyle?: string;
        shadowStyle?: string;
        squareBackground?: string;
    };
    resultBackground: string;
    playing?: {
        background?: string;
        board?: {
            background?: string;
            border?: string;
            borderStyle?: string;
            shadowStyle?: string;
            squareBackground?: string;
        };
    };
}

export type DeepRequired<T> = Required<{
    [K in keyof T]: DeepRequired<T[K]>;
}>;

export type CompleteTheme = DeepRequired<Theme>;

export const toCSSVariableCase = (str: string): string => {
    return '--' + str.replaceAll('.', '-');
};

export const completeTheme = (theme: Theme): CompleteTheme => {
    const full = Object.assign(
        {
            btnSuccess: '#14b488',
            btnError: '#fd5263',
            btnPressed: theme.primary,
            board: {
                borderStyle: 'none',
                shadowStyle: 'none',
                squareBackground: theme.primary,
            },
            playing: {
                background: theme.background,
                board: {
                    background: theme.board.background || theme.background,
                    border: theme.board.border || theme.border,
                    borderStyle: 'none',
                    shadowStyle: 'none',
                    squareBackground: theme.board.squareBackground || theme.primary,
                },
            },
        },
        { ...theme }
    ) as CompleteTheme;
    return full;
};

type InlineObject<T> = {
    [key in keyof T]: T[key] extends object ? InlineObject<T[key]> : T[key];
};

export const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Small type issue here.
 *
 * @param obj
 * @returns
 */
export const applyInlineStyntax = <T>(obj: T): InlineObject<T> => {
    const inline = {};

    for (const key in obj) {
        const value = obj[key];
        const prefix = key;
        let inlineObjValue: object = {
            '': value,
        };
        if (typeof value === 'object') {
            inlineObjValue = applyInlineStyntax(value);
        }
        Object.keys(inlineObjValue).forEach((childKey) => {
            inline[prefix + capitalize(childKey)] = inlineObjValue[childKey];
        });
    }

    return inline as InlineObject<T>;
};
