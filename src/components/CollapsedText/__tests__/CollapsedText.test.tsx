/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CollapsedText, { calculateLineHeight } from '../CollapsedText';
import { WrappedText, CollapsedTextWrapper } from '../CollapsedTextStyled';
import { wait, waitRenderer } from '../../../testing/wait';
import { Button } from '../../Button';
import { AppThemeProvider } from '../../../context/AppThemeContext';

const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight');

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 100 });
});

afterAll(() => {
  if (originalClientHeight) {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight);
  }
});

describe('renders collapsed text', () => {
  it('not collapsed text matches snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <CollapsedText fontSize={1.5}>I&apos;m not collapsed</CollapsedText>
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('check not collapsed text', async () => {
    const fontSize = 1.5;
    const visibleRows = 2;
    const component = shallow(
      <CollapsedText visibleRows={visibleRows} fontSize={fontSize}>
        I&apos;m not collapsed
      </CollapsedText>,
    );

    expect(component.find(WrappedText).prop('maxHeight')).toBe('initial');
    expect(component.find(WrappedText).prop('lineHeight')).toBe(`${calculateLineHeight(fontSize)}rem`);
  });

  it('check collapsed text, check click on "read more"', async () => {
    const fontSize = 1.5;
    const visibleRows = 2;
    const component = mount(
      <AppThemeProvider>
        <CollapsedText visibleRows={visibleRows} fontSize={fontSize}>
          Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text.
          Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text. Collapsed long text.
          Collapsed long text. Collapsed long text. Collapsed long text.
        </CollapsedText>
      </AppThemeProvider>,
    );

    await wait();

    component.update();

    expect(component.find(WrappedText).props().maxHeight).toBe(`${calculateLineHeight(fontSize) * visibleRows}rem`);
    expect(component.find(WrappedText).props().lineHeight).toBe(`${calculateLineHeight(fontSize)}rem`);

    expect(toJson(component.find(CollapsedTextWrapper))).toMatchSnapshot();

    component.find(Button).simulate('click');
    component.update();
    expect(component.find(WrappedText).props().maxHeight).toBe('initial');
  });
});
