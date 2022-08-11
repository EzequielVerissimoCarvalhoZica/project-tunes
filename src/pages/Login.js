import React from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import { Route } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameLogin: '',
      disabledButton: true,
      isLogged: false,
      loading: false,
    };

    this.changeName = this.changeName.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.containLogin = this.containLogin.bind(this);
  }

  changeName({ target }) {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInput);
  }

  verifyInput() {
    const { nameLogin } = this.state;
    const MIN_NAME_INPUT = 3;

    if (nameLogin.length >= MIN_NAME_INPUT) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  buttonClick() {
    const { nameLogin } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: nameLogin });
      this.setState({
        loading: false,
        isLogged: true,
      });
    });
  }

  containLogin() {
    const { nameLogin, disabledButton } = this.state;
    return (
      <>
            <img className="image-login" src="./assets/login.svg" alt="people listerning music"/>
           <div>
           <div className="loginPage">
          <img className="logoLogin" src="./assets/profile.svg" alt="default profile" />
        <form className="">
          <InputGroup className="mb-3 form-group">
            <label htmlFor="login">
              <Form.Control
              className="inputs"
                aria-label="Nome"
                aria-describedby="basic-addon2"
                value={ nameLogin }
                onChange={ this.changeName }
                placeholder="Nome"
                type="text"
                name="nameLogin"
                data-testid="login-name-input"
              />
            </label>
            <Button
              disabled={ disabledButton }
              onClick={ this.buttonClick }
              type="button"
              data-testid="login-submit-button"
              variant="outline-danger"
            >
              Login
      
            </Button>{' '}
          </InputGroup>
        </form>
      </div>
           </div>
      </>
    )
  }

  render() {
    const { loading, isLogged } = this.state;

    return (
      <div data-testid="page-login" className="loginContainer">
        { loading ? <Loading /> : this.containLogin() }
        { isLogged && <Redirect to="/search" />}
        
      </div>
    );
  }
}

export default Login;
