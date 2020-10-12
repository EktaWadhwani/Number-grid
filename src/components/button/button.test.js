import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../../validation/validationwrapper';
import Button from './index';

describe('Button component', () => {
  let Component;

  const mockProps = {
    onClick: jest.fn()
  }

  beforeEach(() => {
    Component = mount(
      <Form>
        <Button  {...mockProps} />
      </Form>
    );
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Should call onClick function when button is clicked', () => {
    Component.find('button')
      .first()
      .simulate('click');

    expect(mockProps.onClick).toHaveBeenCalled();

  });




});
