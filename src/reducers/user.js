import { ADD_USER } from '../actions';

const INITIAL_USER = {
  email: '',
};

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
