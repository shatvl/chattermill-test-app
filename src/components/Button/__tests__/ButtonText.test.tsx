import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import Button, { ButtonSizes } from '../Button';
import { waitRenderer } from '../../../testing/wait';

describe('renders button', () => {
  it('default MD button check snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <Button>click me</Button>
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toJSON()).toHaveStyleRule('font-size', '1rem');
    expect(tree.toJSON()).toHaveStyleRule('padding', '0.625rem 1.25rem');
  });

  it('extra small XS button check snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <Button size={ButtonSizes.XS}>click me</Button>
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toJSON()).toHaveStyleRule('font-size', '0.875rem');
    expect(tree.toJSON()).toHaveStyleRule('padding', '0.25rem 0.375rem');
  });

  //TODO: continue for all cases :)
});
