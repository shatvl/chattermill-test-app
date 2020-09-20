/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import mockFetch from '../../../testing/mockFetch';
import Theme from '../Theme';

describe('renders theme', () => {
  it('theme snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <Theme id={6374} sentiment={1}></Theme>
      </AppThemeProvider>,
    );

    mockFetch(200, { data: { id: 6374, name: 'General' } });

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
