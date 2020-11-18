import React from 'react';
import { mount } from 'enzyme';
import Grid from '.';

describe('Grid component', () => {
  let Component;

  beforeEach(() => {
    Component = mount(<Grid />);
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Count of buttons should be 144', () => {
    const Buttons = Component.find('button');
    expect(Buttons.length).toBe(144);
  });

  it('When 1 is clicked all 144 buttons should be highlighted', () => {
    Component.find('button').findWhere(x => x.text() === '1' && x.type() === 'button').simulate('click');
    const HighlightedButtons = Component.find('div.active');
    expect(HighlightedButtons.length).toBe(144);
  });

  it('When 2 is clicked 72 buttons should be highlighted', () => {
    Component.find('button').findWhere(x => x.text() === '2' && x.type() === 'button').simulate('click');
    const HighlightedButtons = Component.find('div.active');
    expect(HighlightedButtons.length).toBe(72);
  });

  it('When 50 is clicked 2 button should be highlighted', () => {
    Component.find('button').findWhere(x => x.text() === '50' && x.type() === 'button').simulate('click');
    const HighlightedButtons = Component.find('div.active');
    expect(HighlightedButtons.length).toBe(2);
  });
  it('When 144 is clicked only 1 button should be highlighted', () => {
    Component.find('button').findWhere(x => x.text() === '144' && x.type() === 'button').simulate('click');
    const HighlightedButtons = Component.find('div.active');
    expect(HighlightedButtons.length).toBe(1);
  });

});
