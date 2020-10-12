import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../../validation/validationwrapper';
import InputGroup from './InputGroup';


describe('InputGroup component', () => {
  let Component;

  beforeEach(() => {
    Component = mount(
      <Form>
        <InputGroup id="test" />
      </Form>
    );
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });
});
