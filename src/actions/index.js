export const ADD_USER = 'ADD_USER';
export const IS_LOADING = 'IS_LOADING';
export const RESPONSE_SUCCES = 'RESPONSE_SUCCESS';
export const RESPONSE_FAIL = 'RESPONSE_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_EXCHANGE = 'GET_EXCHANGE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});

export const errorFetching = (message) => ({
  type: RESPONSE_FAIL,
  payload: message,
});

const responseSuccess = (currencies) => ({
  type: RESPONSE_SUCCES,
  payload: currencies,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch({ type: IS_LOADING });
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data)
        .filter((item) => item !== 'USDT');
      dispatch(responseSuccess(currencies));
      dispatch({ type: GET_EXCHANGE,
        payload: data });
    } catch (error) {
      dispatch(errorFetching(error.message));
    }
  }
);

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});
