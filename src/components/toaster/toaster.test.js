import React from 'react';
import { mount } from 'enzyme';
import Toaster from '.';

describe('Toaster component', () => {
  let Component;

  const mockProps = {
    title: 'Test'
  }

  beforeEach(() => {
    Component = mount(<Toaster {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Title should match prop title', () => {
    const Heading = Component.find('h1').text().trim();
    expect(Heading).toBe(mockProps.title);
  });
});
