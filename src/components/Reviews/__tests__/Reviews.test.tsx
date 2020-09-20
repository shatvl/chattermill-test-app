/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import mockFetch from '../../../testing/mockFetch';
import Reviews from '../Reviews';
import mockedResponse from '../__mocks__/response.json';

describe('renders reviews', () => {
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

  it('reviews snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <Reviews />
      </AppThemeProvider>,
    );

    mockFetch(200, mockedResponse);

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
