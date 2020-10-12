import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateEvent, fetchCategories, publishEvent, fetchCoordinators } from '../redux/actions';
import Header from '../components/header';
import Segment from '../components/segment';
import Toaster from '../components/toaster';
import { Form } from '../validation/validationwrapper';
import Button from '../components/button';
import InputGroup from '../components/inputGroup';
import { required, email, integer, minValue } from '../validation/validators';
import CharCount from '../components/charCount';
import { FullWidth } from './view.styled';

class Event extends Component {

  async componentDidMount() {
    await this.props.dispatch(fetchCategories());
    await this.props.dispatch(fetchCoordinators());
  }

  updateEvent = async (field, val) => {
    await this.props.dispatch(updateEvent({ [field]: val }));
  };

  renderLoading() {
    if (!this.props.event.fetching) return null;
    return (<span>Loading....</span>);
  }

  renderError() {
    if (!this.props.event.hasError) return null;
    return (<span>Some error occured...</span>);
  }

  renderSuccess() {
    if (!this.props.event.success) return null;
    return (<Toaster title='Success'>Event has been created</Toaster>);
  }

  renderForm() {
    return (<Form>
      <Segment title='About'>
        <InputGroup
          value={this.props.event.title}
          validations={[required]}
          id="title"
          label='Title'
          mandatory
        >
          <input
            placeholder='Make it short and clear'
            id="title"
            type="text"
            value={this.props.event.title}
            onChange={e => this.updateEvent('title', e.target.value)} />
        </InputGroup>

        <InputGroup
          value={this.props.event.description}
          validations={[required]}
          id="description"
          label='description'
          mandatory
        >
          <FullWidth>
            <textarea
              maxLength="140"
              placeholder='Write about your event, be creative'
              id="description"
              type="textarea"
              value={this.props.event.description}
              onChange={e => this.updateEvent('description', e.target.value)} />
            <CharCount
              maxChars={140}
              currentChars={this.props.event.description.length}
            />
          </FullWidth>
        </InputGroup>
        <InputGroup
          value={this.props.event.category_id}
          id="category"
          label='Category'
        >
          <select
            value={this.props.event.category_id}
            onChange={e => this.updateEvent('category_id', e.target.value)}
          >
            <option value="">Select Category</option>
            {this.props.event.categoryArr.map(cat =>
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            )}

          </select>
        </InputGroup>
        <InputGroup
          validations={this.props.event.paid_event.toString() === "1" && [required, minValue(1, 'Min payment is 1')]}
          value={this.props.event.payment}
          id="paid_event"
          label='Payment'
        >

          <input type="radio" name="paid_event"
            checked={this.props.event.paid_event.toString() === "0"}
            value={0}
            onChange={e => this.updateEvent('paid_event', e.target.value)} /> Free Event

        <input type="radio" name="paid_event"
            value={1}
            checked={this.props.event.paid_event.toString() === "1"}
            onChange={e => this.updateEvent('paid_event', e.target.value)} /> Paid Event

     {this.props.event.paid_event.toString() === "1" &&
            <React.Fragment>
              <input
                placeholder='Fee'
                id="paid_event"
                type="number"
                value={this.props.event.payment}
                onChange={e => this.updateEvent('payment', e.target.value)} />
              <span>$</span>
            </React.Fragment>
          }

        </InputGroup>
        <InputGroup
          value={this.props.event.reward}
          validations={[integer()]}
          id="reward"
          label='Reward'
        >
          <input
            placeholder='Number'
            id="reward"
            type="number"
            value={this.props.event.reward}
            onChange={e => this.updateEvent('reward', e.target.value)} />
          <span>rewards point for attendance</span>
        </InputGroup>
      </Segment>
      <Segment title='Coordinator'>
        <InputGroup
          validations={[required]}
          value={this.props.event.coordinator.id}
          id="coordinator"
          label='coordinator'
          mandatory
        >
          <select
            value={this.props.event.coordinator.id}
            onChange={e => {
              const cordinator = this.props.event.cordinatorArr.find(c => c.id.toString() === e.target.value.toString());
              this.updateEvent('coordinator', {
                id: e.target.value,
                email: cordinator ? cordinator.email : ''
              })
            }
            }
          >
            <option value="">Select Coordinator</option>
            {this.props.event.cordinatorArr.map(cor =>
              <option key={cor.id} value={cor.id}>{`${cor.name} ${cor.lastname}`}</option>
            )}
          </select>
        </InputGroup>
        <InputGroup
          value={this.props.event.coordinator.email}
          validations={[email()]}
          id="email"
          label='Email'
        >
          <input
            placeholder='Email'
            id="email"
            type="email"
            value={this.props.event.coordinator.email}
            onChange={e =>
              this.updateEvent('coordinator', {
                id: this.props.event.coordinator.id,
                email: e.target.value
              })

            } />

        </InputGroup>
      </Segment>
      <Segment title='When'>
        <InputGroup
          value={this.props.event.date}
          id="date"
          label='Starts On'
          validations={[required]}
          mandatory
        >
          <input
            placeholder='dd/mm/yyyy'
            id="date"
            type="date"
            value={this.props.event.date}
            onChange={e => this.updateEvent('date', e.target.value)} />
          <span>at</span>
          <input
            placeholder='-:-'
            id="time"
            type="time"
            value={this.props.event.time}
            onChange={e => this.updateEvent('time', e.target.value)} />

        </InputGroup>
        <InputGroup
          value={this.props.event.reward}
          id="duration"
          label='Duration'
        >
          <input
            placeholder='Number'
            id="duration"
            type="number"
            value={this.props.event.duration}
            onChange={e => this.updateEvent('duration', e.target.value)} />
          <span>hour</span>
        </InputGroup>
      </Segment>
      <Button onClick={() => this.props.dispatch(publishEvent())}>PUBLISH EVENT</Button>
    </Form>)
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.renderError() || this.renderLoading() || this.renderSuccess() || this.renderForm()}
      </React.Fragment>
    )
  }
}

Event.propTypes = {
  dispatch: PropTypes.func,
  event: PropTypes.object
};

export default Event;