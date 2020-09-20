import React, { FC, createContext, useContext } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

interface AppThemeContextProps {}

export interface AppTheme extends DefaultTheme {
  colors: {
    [key: string]: string;
  };
  zIndex: {
    [key: string]: number;
  };
  fonts: {
    header: string;
    main: string;
  };
  borderWidth: string;
}

// global theme for app, TODO: dark / light mode
export const getTheme = (): AppTheme => ({
  zIndex: {
    xs: 1,
    s: 2,
    m: 3,
    lg: 4,
    xlg: 5,
    xxlg: 6,
  },
  colors: {
    background: '#fff',
    primary: '#ff8489',
    primaryLight: 'rgba(255, 132, 136, .2)',
    primaryMedium: 'rgba(255, 132, 136, .5)',
    red: '#d65942',
    gray: '#c4c9cc',
    grayLight: 'e3e3e3',
    text: '#2e3939',
    textLighter: '#2e3939',
    textSecondary: '#707579',
    textMeta: '#bfbfbf',
    black: '#000000',
    white: '#ffffff',
  },
  fonts: {
    header: 'Hind Siliguri',
    main: 'Hind Siliguri',
  },
  borderWidth: '0.0625rem',
});

export const AppThemeContext = createContext<AppThemeContextProps>({});

export const AppThemeProvider: FC = ({ children }) => (
  //we could implement dark / light theme here, or user specific styles base on user session
  <AppThemeContext.Provider value={{}}>
    <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
  </AppThemeContext.Provider>
);

export const usePortalAppThemeContext = () => useContext(AppThemeContext);
