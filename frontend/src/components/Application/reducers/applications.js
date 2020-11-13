import * as types from '../constants/ActionTypes';
import { emptyApplication } from '../constants/EmptyApplication';

const initialState = [{ ...emptyApplication }]; //database??????

const applications = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.ADD_APPLICATION:
      newState = [
        ...state, { ...emptyApplication },
      ];
      return newState;

    case types.CLEAN_APPLICATION:
      newState = [ ...state ];
      newState[action.payload] = { //CRUTCH!
        flightDirection: {
          value: '',
          priority: '',
        },
        workDuration: {
          value: '',
          priority: '',
        },
        answer: {
          value: '',
          priority: '',
        },
        weekends: {
          value: '',
          priority: '',
        },
        departureTime: {
          day: '',
          time: '',
          priority: '',
        },
        comments: {
          value: '',
          priority: '',
        },
      };
      return newState;

    case types.DELETE_ALL_APPLICATIONS:
      newState = [];
      return newState;

    case types.UPDATE_INPUT:
      newState = [ ...state ];
      newState[action.payload.id][action.payload.name].value = action.payload.value;
      return newState;

    case types.UPDATE_PRIORITY:
      newState = [ ...state ];
      newState[action.payload.id][action.payload.name].priority = action.payload.value;
      return newState;

    case types.UPDATE_DATE:
      newState = [ ...state ];
      newState[action.payload.id].departureTime[action.payload.name] += `${action.payload.value} `;
      return newState;

    default:
      return state;
  }
};

export default applications;
