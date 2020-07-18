import React from 'react';
import { auth, provider } from '../utils/firebase';
import { connect } from 'react-redux';
import { setUser, setLogin } from '../actions/';

const Login = (props) => {
  /**
   * loginFacebook
   * * For authentication going to sign in a pop window, with facebook as a provider, 
   * * Set in setUser state the user
   * * Set in setLogin state true value
   * @param props Getting props from any page to push into panel dir after log in into page
   */
  const loginFacebook = () => {
    auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        props.setUser(user);
        props.setLogin(true);
        props.history.push('/panel');
      });
  };

  return (
    <div className='Login'>
      <div className='Login-container'>
        <div className='Login-content'>
          <h2>Crear cuenta o Iniciar sesion</h2>
          <div className='Login-btn'>
            <button onClick={loginFacebook}>
              <i className='fab fa-facebook-square' />
              <span>Iniciar sesion con Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
  setLogin,
};

export default connect(null, mapDispatchToProps)(Login);
