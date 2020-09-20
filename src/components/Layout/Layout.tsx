/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react';
import { GlobalStyle, Main } from './LayoutStyled';

interface LayoutProps {
  header?: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children, header }) => (
  <>
    {header}
    <GlobalStyle />
    <Main>{children}</Main>
    <footer />
  </>
);

export default Layout;
