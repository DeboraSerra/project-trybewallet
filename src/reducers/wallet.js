import { IS_LOADING, RESPONSE_FAIL, RESPONSE_SUCCES,
  ADD_EXPENSE, GET_EXCHANGE, REMOVE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  error: '',
  isLoading: false,
  exchangeRates: {},
};

const walletReducer = (state = INITIAL_WALLET, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case RESPONSE_SUCCES:
    return {
      ...state,
      currencies: action.payload,
      isLoading: false,
      error: '',
    };
  case RESPONSE_FAIL:
    return {
      ...state,
      currencies: [],
      isLoading: false,
      error: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .some(({ id }) => id === action.payload.id) ? (
          state.expenses.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, ...action.payload };
            }
            return item;
          })
        ) : [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case GET_EXCHANGE:
    return {
      ...state,
      exchangeRates: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
