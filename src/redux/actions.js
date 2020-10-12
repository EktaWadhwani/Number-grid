import {
  UPDATE_EVENT,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERRORS,
  GET_CATEGORIES,
  SUBMIT_EVENT,
  GET_COORDINATORS,
  GET_COORDINATORS_SUCCESS,
  GET_COORDINATORS_ERRORS
} from './Action.types';

// TO DO - get it dynamically 
const CATEGORY_END_POINT = 'http://www.mocky.io/v2/5bcdd3942f00002c00c855ba';
const RESPOSIBLE_END_POINT = 'http://www.mocky.io/v2/5bcdd7992f00006300c855d5';

export function updateEvent(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_EVENT,
      payload: data
    });
  };
}

export function fetchCategories() {
  return async dispatch => {
    dispatch({
      type: GET_CATEGORIES
    });
    try {
      const categories = await fetch(CATEGORY_END_POINT).then(response => response.json());
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: categories,
      })
    } catch (err) {
      dispatch({
        type: GET_CATEGORIES_ERRORS
      })
    }
  }
}
export function fetchCoordinators() {
  return async dispatch => {
    dispatch({
      type: GET_COORDINATORS
    });
    try {
      const coordinators = await fetch(RESPOSIBLE_END_POINT).then(response => response.json());
      dispatch({
        type: GET_COORDINATORS_SUCCESS,
        payload: coordinators,
      })
    } catch (err) {
      dispatch({
        type: GET_COORDINATORS_ERRORS
      })
    }
  }
}

function convertDate(date, time) {
  const formattedDate = new Date(`${date} ${time}`).toISOString()
  const lastIndex = formattedDate.lastIndexOf(":");
  return formattedDate.substring(0, lastIndex);

}



export function publishEvent() {
  return async (dispatch, getState) => {
    const { event: { event } } = getState();

    const messageToPrint = {
      title: event.title,
      description: event.description,
      category_id: Number(event.category_id),
      paid_event: Number(event.paid_event) === 1 ? true : false,
      event_fee: Number(event.payment),
      reward: Number(event.reward),
      date: convertDate(event.date, event.time), // This will convert into GMT hence time might be different from what user entered
      duration: Number(event.duration) * 60 * 60,
      coordinator: {
        email: event.coordinator.email,
        id: event.coordinator.id,
      },
    }
    console.log(messageToPrint);
    dispatch({
      type: SUBMIT_EVENT
    });
  }

}