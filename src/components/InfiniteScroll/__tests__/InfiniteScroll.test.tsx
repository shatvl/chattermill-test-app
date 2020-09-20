/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { mount } from 'enzyme';
import { wait, waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import InfiniteScroll from '../InfiniteScroll';
import { InfiniteScrollLoader } from '../InfiniteScrollStyled';

describe('renders infinite scroll', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: () => null,
      disconnect: mockDisconnect,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const loadFn = jest.fn();

  it('infinite scroll snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <InfiniteScroll loading={false} hasMore={true} load={loadFn}></InfiniteScroll>
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('infinite scroll with loading snapshot', async () => {
    const component = mount(
      <AppThemeProvider>
        <InfiniteScroll loading={true} hasMore={true} load={loadFn}></InfiniteScroll>
      </AppThemeProvider>,
    );

    await wait();

    component.update();

    expect(component.find(InfiniteScrollLoader)).toBeDefined();
  });

  it('infinite scroll IntersectionObserver API are called', async () => {
    const component = mount(
      <AppThemeProvider>
        <InfiniteScroll loading={true} hasMore={true} load={loadFn}></InfiniteScroll>
      </AppThemeProvider>,
    );

    await wait();

    component.update();

    expect(mockObserve).toBeCalled();
    expect(mockDisconnect).toBeCalledTimes(0);

    component.unmount();
    expect(mockDisconnect).toBeCalledTimes(1);
  });
});
