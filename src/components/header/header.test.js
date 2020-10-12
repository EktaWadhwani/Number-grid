import React from 'react';
import { mount } from 'enzyme';
import Header from './';

describe('Headers component', () => {
  let Component;


  beforeEach(() => {
    Component = mount(<Header />);
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Should have one h1 element', () => {
    const Heading = Component.find('h1');
    expect(Heading.length).toBe(1);
  });
});
