/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { mount } from 'enzyme';
import { wait, waitRenderer } from '../../../testing/wait';
import { AppThemeProvider } from '../../../context/AppThemeContext';
import InputGroup from '../InputGroup';
import { InputGroupInput, InputGroupLabel } from '../InputGroupStyled';

describe('renders input group', () => {
  it('input group matches snapshot', async () => {
    const onChangeFn = jest.fn();

    const tree = renderer.create(
      <AppThemeProvider>
        <InputGroup onChange={onChangeFn} value="" formControlName="testfield" />
      </AppThemeProvider>,
    );

    await waitRenderer();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('check onchange in input group', async () => {
    const onChangeFn = jest.fn();
    const mockedEvent = { target: { name: 'change', value: 'testing?' } };
    const mockedControlName = 'testfield';

    const component = mount(
      <AppThemeProvider>
        <InputGroup onChange={onChangeFn} value="" formControlName={mockedControlName} />
      </AppThemeProvider>,
    );

    await wait();

    component.update();

    component.find(InputGroupInput).simulate('change', mockedEvent);

    expect(onChangeFn).toBeCalledWith(mockedControlName, mockedEvent.target.value);
  });

  it('check "floating" label', async () => {
    const onChangeFn = jest.fn();
    const label = 'label';

    const component = mount(
      <AppThemeProvider>
        <InputGroup label={label} onChange={onChangeFn} value="" formControlName="testfield" />
      </AppThemeProvider>,
    );

    await wait();

    component.update();

    expect(component.find(InputGroupLabel).prop('focused')).toBeFalsy();
    expect(component.find(InputGroupLabel).prop('children')).toEqual(label);

    //focus input and label will be visible (focused)
    component.find(InputGroupInput).simulate('focus');
    component.update();
    expect(component.find(InputGroupLabel).prop('focused')).toBeTruthy();

    //blur input and label will be invisible
    component.find(InputGroupInput).simulate('blur');
    expect(component.find(InputGroupLabel).prop('focused')).toBeFalsy();
  });
});
