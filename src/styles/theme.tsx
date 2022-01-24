import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    base: '280px',
    sm: '480px',
    md: '680px',
    lg: '980px',
    xl: '1280px',
    '2xl': '1580px',
});

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    breakpoints,
    fonts: {
        heading:
      'SoraVariable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        body: 'SoraVariable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        code: '"Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    styles: {
        global: {
            body: {
                initialColorMode: 'dark',
                color: 'white',
                minHeight: '100vh',
            },
        },
    },
    colors: {
        primary: {
            100: '#87DDB3',
            300: '#4BC88C',
            500: '#2ABB75',
            700: '#1D8251',
            900: '#145D3A'
        },
        secondary: {
            100: '#EB7391',
            300: '#E44970',
            500: '#DF2151',
            700: '#B11B40',
            900: '#851430'
        }
    },
    components: {
        Text: {
            variants: {
                micro: {
                    fontSize: '0.75rem',
                    color: 'gray.100',
                    fontWeight: '500',
                },
                small: {
                    fontSize: '0.85rem',
                    color: 'white',
                    fontWeight: '200',
                },
                body2: {
                    fontSize: '1.15rem',
                    color: 'white',
                    fontWeight: '400',
                },
                body1: {
                    fontSize: '1.25rem',
                    color: 'white',
                    fontWeight: '400',
                },
            },
        },
        Heading: {
            variants: {
                subheader: {
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.5rem',
                    letterSpacing: '4px',
                },
                header4: {
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#A0A3B1',
                },
                header3: {
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    color: 'white',
                },
                header2: {
                    fontSize: '1.5rem',
                    fontWeight: '400',
                    color: 'white',
                },
                header1: {
                    fontSize: '2rem',
                    fontWeight: '600',
                    color: 'white',
                },
                big: {
                    fontSize: '4rem',
                    fontWeight: '600',
                    color: 'white',
                },
            },
        },
        Button: {
            variants: {
                primary: {
                    borderRadius: 'none',
                    bg: 'primary.500',
                    p: '8px 55px',
                    h: '38px',
                    color: 'white',
                    fontWeight: 'light',
                    _hover: { bg: 'primary.700' },
                    _focus: {boxShadow: 'none'}
                },
                secondary: {
                    borderRadius: 'none',
                    bg: 'secondary.500',
                    p: '8px 55px',
                    h: '38px',
                    color: 'white',
                    fontWeight: 'light',
                    _hover: { bg: 'secondary.700' },
                    _focus: {boxShadow: 'none'}
                },
            },
        },
    },
});
