import React from 'react';
import { mount } from 'enzyme';
import CharCount from './';

describe('CharCount component', () => {
  let Component;

  const mockProps = {
    maxChars: 10,
    currentChars: 5
  }

  beforeEach(() => {
    Component = mount(
      <CharCount  {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Char count should be max chars - current chars', () => {
    expect(
      Component.find('small').last().text().trim()).toBe('5');
  });
});
