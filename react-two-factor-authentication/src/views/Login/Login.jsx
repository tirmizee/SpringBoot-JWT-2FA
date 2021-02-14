import React, { PureComponent } from 'react';
import auth from '../../services/AuthService/AuthService'
import PropTypes from 'prop-types';
import  './Login.scss';

class Login extends PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      username : '', 
      password : ''
    }
    this.onLogin = this.onLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    let usernamePassword = username + ':' + password;
    let usernamePasswordBase64 = btoa(usernamePassword);
    
    auth.login(usernamePasswordBase64)
      .then((response) => {
        console.log(response);
        auth.setAuthenticated(true);
        this.props.history.push("/")
      })
      .catch((error) => {
        if(error.response) {
          console.log(error.response.status);
        }
      });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name] : value });
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
    const { username, password } = this.state;
    return (
      <div className="container">
         <div className="form-container">
           <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input 
                type="text"
                name="username"
                value={username} 
                placeholder="username"
                onChange={this.onChange} />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input 
                type="text" 
                name="password"
                value={password} 
                placeholder="password"
                onChange={this.onChange}/>
            </div>
            <input 
              type="submit" 
              className="btn" 
              value="Login" 
              onClick={this.onLogin} />
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
