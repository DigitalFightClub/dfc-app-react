import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  base: '280px',
  sm: '380px',
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
      'Sora, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'Sora, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
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
});
