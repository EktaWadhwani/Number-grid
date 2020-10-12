import React from 'react';
import { mount } from 'enzyme';
import Segment from './';

describe('Segment component', () => {
  let Component;

  const mockProps = {
    title: 'Test'
  }

  beforeEach(() => {
    Component = mount(<Segment {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Title should match prop title', () => {
    const Heading = Component.find('h1').text().trim();
    expect(Heading).toBe(mockProps.title);
  });
});
