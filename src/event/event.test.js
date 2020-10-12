import React from 'react';
import { mount } from 'enzyme';
import Event from './view';
import { Err } from '../components/inputGroup/InputGroup.styled';

describe('Event component', () => {
  let Component;
  let publishEvent = false;
  const mockProps = {
    event: {
      title: '',
      description: '',
      category_id: '',
      paid_event: 0,
      event_fee: '',
      reward: '',
      date: '',
      time: '',
      duration: '',
      payment: '',
      coordinator: {
        email: '',
        id: '',
      },
      categoryArr: [],
      cordinatorArr: [],
      success: false,
      fetching: false,
      hasError: false
    },
    dispatch: () => {
      publishEvent = true;
    }
  };
  beforeEach(() => {
    Component = mount(<Event {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(Component.exists()).toBe(true);
  });

  it('Four mandatory fields error should be displayed', () => {
    Component.find('button')
      .first()
      .simulate('click');
    const Errors = Component.find(Err);
    expect(Errors.length).toBe(4);
  });

  it('No error should be displayed when all mandatory fields are filled', () => {
    Component.setProps({
      event: {
        ...mockProps.event,
        title: 'Test',
        description: 'This is test description',
        coordinator: {
          email: 'test@gmail.com',
          id: '4'
        },
        date: '20/2/2020'
      }
    });
    Component.find('button')
      .first()
      .simulate('click');
    const Errors = Component.find(Err);
    expect(Errors.length).toBe(0);
  });
});
