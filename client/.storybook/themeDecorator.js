import React from 'react';
import { ThemeProvider, theme } from '../styles/theme';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={Theme}>{storyFn()}</ThemeProvider>
);

export default ThemeDecorator;
