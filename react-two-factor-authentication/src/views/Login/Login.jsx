import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import  './Login.scss';

class Login extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log('Login will mount');
  }

  componentDidMount = () => {
    console.log('Login mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Login will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Login will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Login did update');
  }

  componentWillUnmount = () => {
    console.log('Login will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="container">
         <div className="form-container">
           <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input type="text" placeholder="username"/>
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input type="text" placeholder="password"/>
            </div>
            <input className="btn" type="submit" value="Login"/>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon"><i className="fa fa-github"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-google"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
            </div>
           </form>
         </div>
      </div>
    );
  }
}

Login.propTypes = {
  // bla: PropTypes.string,
};

Login.defaultProps = {
  // bla: 'test',
};

export default Login;
