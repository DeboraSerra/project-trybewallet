import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  }

  validateForm = () => {
    const { email, password } = this.state;
    const isValidEmail = email.match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{2,}/gmi);
    const passLength = 6;
    const isValidPass = password.length >= passLength;
    this.setState({ isValid: isValidEmail && isValidPass });
  }

  sendLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/project-trybewallet/carteira');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <form onSubmit={ this.sendLogin } className="login-form" >
        <input
          className="login-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          className="login-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
          placeholder="Password"
        />
        <button
          className="login-btn"
          type="submit"
          onClick={ this.sendLogin }
          disabled={ !isValid }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
