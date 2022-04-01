import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies, addExpense } from '../actions';
import CreateSelect from '../components/CreateSelect';
import Loading from '../components/Loading';
import ExpensesTable from '../components/ExpensesTable';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: 'alimentacao',
      id: 0,
      lastId: null,
      change: false,
      exchangeRates: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  sendExpense = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    const { price } = this.props;
    const { value, description, currency, method, tag,
      id, lastId, exchangeRates } = this.state;
    const currExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRates || price,
    };
    dispatch(addExpense(currExpense));
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: 'alimentacao',
      id: id < lastId ? lastId : id + 1,
      lastId: id,
      change: false,
      exchangeRates: null,
    });
  }

  editExpense = (item) => {
    const { id } = this.state;
    this.setState({
      value: item.value,
      description: item.description,
      currency: item.currency,
      method: item.method,
      tag: item.tag,
      id: item.id,
      lastId: id,
      change: true,
      exchangeRates: item.exchangeRates,
    });
  }

  render() {
    const { isLoading } = this.props;
    const { value, description, currency, method, tag, change } = this.state;
    return (
      <section>
        <Header />
        <form onSubmit={ this.sendExpense } className="data-form">
          <input
            className="wallet-input"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            placeholder="Value"
          />
          <input
            className="wallet-input"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Description"
          />
          <CreateSelect
            value={ currency }
            handleChange={ this.handleChange }
          />
          <select
            className="wallet-select"
            value={ method }
            onChange={ this.handleChange }
            name="method"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            className="wallet-select"
            value={ tag }
            onChange={ this.handleChange }
            name="tag"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            className="wallet-btn"
            type="submit"
            onClick={ this.sendExpense }
          >
            {change ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
        {isLoading && <Loading />}
        <ExpensesTable editExpense={ this.editExpense } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  price: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  price: PropTypes.objectOf(
    PropTypes.shape({
      ask: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
