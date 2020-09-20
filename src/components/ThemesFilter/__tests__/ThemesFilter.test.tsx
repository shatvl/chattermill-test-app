/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { wait, waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import mockFetch from '../../../testing/mockFetch';
import mockedResponse from '../__mocks__/response.json';
import ThemesFilter from '../ThemesFilter';
import { mount } from 'enzyme';
import { FilterClear, FilterInput, FilterPopupListItem } from '../ThemesFilterStyled';
import { FilterContext } from '../../../context/FilterContext';

describe('renders themes filter', () => {
  it('themes filter snapshot', async () => {
    const tree = renderer.create(
      <AppThemeProvider>
        <ThemesFilter />
      </AppThemeProvider>,
    );

    mockFetch(200, mockedResponse);

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('themes filter focus input and check items', async () => {
    mockFetch(200, mockedResponse);

    const component = mount(
      <AppThemeProvider>
        <ThemesFilter />
      </AppThemeProvider>,
    );

    await wait();

    component.update();
    expect(component.find(FilterPopupListItem).length).toEqual(0);
    component.find(FilterInput).simulate('focus');
    component.update();
    expect(component.find(FilterPopupListItem).length).toEqual(mockedResponse.data.length);
    component.find(FilterInput).simulate('blur');
  });

  it('themes filter check select / clear', async () => {
    mockFetch(200, mockedResponse);

    const clearFn = jest.fn();
    const setThemeIdFn = jest.fn();

    const component = mount(
      <AppThemeProvider>
        <FilterContext.Provider value={{ clearFilters: clearFn, setThemeId: setThemeIdFn, themeId: null }}>
          <ThemesFilter />
        </FilterContext.Provider>
      </AppThemeProvider>,
    );

    await wait();

    // check select
    component.update();
    component.find(FilterInput).simulate('focus');
    component.update();
    component.find(FilterPopupListItem).first().simulate('click');
    expect(setThemeIdFn).toBeCalledWith(mockedResponse.data[0].id);
    component.update();
    expect(component.find(FilterInput).prop('value')).toEqual(mockedResponse.data[0].name);

    // check clear
    component.find(FilterClear).simulate('click');
    component.update();
    expect(setThemeIdFn).toBeCalledWith(null);
    expect(component.find(FilterInput).prop('value')).toEqual('');
  });
});
