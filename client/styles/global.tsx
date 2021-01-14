import { createGlobalStyle, css } from 'styled-components';

export const fontUrl =
  'https://fonts.googleapis.com/css2?family=Inter&display=swap';

export const bodyStyles = css`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100vw;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;

  font-family: 'Inter', sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export const GlobalStyle = createGlobalStyle`
 body {
   ${bodyStyles}
 }
`;
