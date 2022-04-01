import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ email, expenses, currency }) => {
  const total = expenses
    .map((item) => ({
      value: parseFloat(item.value),
      rate: parseFloat(item.exchangeRates[item.currency].ask),
    }))
    .reduce((acc, { value, rate }) => acc + (value * rate), 0);
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p>
        R$
        {' '}
        <span data-testid="total-field">
          { total.toFixed(2) }
        </span>
        {' '}
        <span data-testid="header-currency-field">
          {currency}
        </span>
      </p>
    </header>
  );
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          ask: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

export default connect(mapStateToProps)(Header);
