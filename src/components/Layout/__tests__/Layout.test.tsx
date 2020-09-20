/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import Layout from '../Layout';

describe('renders layout', () => {
  it('layout matches snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <Layout></Layout>
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
