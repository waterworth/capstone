import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

// Global decorator to apply the styles to all stories
export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
