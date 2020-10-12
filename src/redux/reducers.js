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

const INITIAL_STATE = {
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
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EVENT:
      return {
        event: {
          ...state.event,
          ...action.payload
        }
      };
    case GET_CATEGORIES:
    case GET_COORDINATORS:
      return {
        event: {
          ...state.event,
          fetching: true,
        }
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        event: {
          ...state.event,
          fetching: false,
          categoryArr: [...action.payload]
        }
      };

    case GET_COORDINATORS_SUCCESS:
      return {
        event: {
          ...state.event,
          fetching: false,
          cordinatorArr: [...action.payload]
        }
      };
    case GET_COORDINATORS_ERRORS:
    case GET_CATEGORIES_ERRORS:
      return {
        event: {
          ...state.event,
          hasError: true
        }
      };

    case SUBMIT_EVENT:
      return {
        event: {
          ...state.event,
          success: true
        }
      };
    default: return state;
  }
};

export default reducer;