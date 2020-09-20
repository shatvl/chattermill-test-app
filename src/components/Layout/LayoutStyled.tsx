import styled, { createGlobalStyle } from 'styled-components';
import { AppTheme } from '../../context/AppThemeContext';

export const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  * {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: ${({ theme }) => theme.fonts.main}, sans-serif;
  }
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.main}, sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";
  }
`;

export const Main = styled.main`
  padding: 0 0.5rem;
`;
