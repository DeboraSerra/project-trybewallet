import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CreateSelect = ({ currencies, handleChange, value }) => (
  <label htmlFor="currency">
    <span className="label">Moeda</span>
    <select
      className="wallet-select"
      id="currency"
      name="currency"
      onChange={ handleChange }
      value={ value }
      data-testid="currency-input"
    >
      {currencies.map((curr) => (
        <option value={ curr } key={ curr }>
          {curr}
        </option>
      ))}
    </select>
  </label>
);

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

CreateSelect.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CreateSelect);
