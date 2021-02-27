import React, { PureComponent } from 'react';
import auth from '../../services/AuthService/AuthService'
import Modal from './Modal'
import PropTypes from 'prop-types';
import { Checkbox } from '@trendmicro/react-checkbox';
 
import '@trendmicro/react-checkbox/dist/react-checkbox.css';
import  './Login.scss';

class Login extends PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      username : '', 
      password : '', 
      passwordConfirm : '',
      refId : '',
      otp : '',
      otpExpire : 0,
      otpLodding : false,
      isOpen : false,
      tab : "L"
    }
    this.otpExpireInterval = null;
    this.onLogin = this.onLogin.bind(this);
    this.onLoginOtp = this.onLoginOtp.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.onBack = this.onBack.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  countDown = () => {
    const { otpExpire } = this.state;
    if (otpExpire === 0) {
      clearInterval(this.otpExpireInterval);
      this.setState({isOpen : false});
    } else {
      this.setState(preState => ({ 
        otpExpire : preState.otpExpire - 1
      }));
    }
  }

  onLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    let usernamePassword = username + ':' + password;
    let usernamePasswordBase64 = btoa(usernamePassword);
    
    auth.login(usernamePasswordBase64)
      .then((response) => {
        const { status } = response;
        if(status) {
          auth.setAuthenticated(true);
          this.props.history.push("/");
        } 
      })
      .catch((error) => {
        if(error.response) {
          console.log(error.response)
          const { code , expireDate, refId} = error.response.data;
          if(code === 'A001'){
            const otpExpire = Math.round((expireDate - new Date()) / 1000);
            this.setState({ refId, otpExpire, isOpen : true });
            this.otpExpireInterval = setInterval(this.countDown, 1000);
          }
        }
      });
  }

  onLoginOtp() {
    const { username, password, otp } = this.state;
    let usernamePassword = username + ':' + password;
    let usernamePasswordBase64 = btoa(usernamePassword);
    
    const callback = () => { 
      auth.loginOtp(usernamePasswordBase64, otp)
        .then((response) => {
          const { status } = response;
          if(status) {
            auth.setAuthenticated(true);
            this.props.history.push("/");
          } 
        })
        .catch((error) => {
          if(error.response) {
            console.log(error.response)
          }
        });
    }

    this.setState({ otpLodding : true }, callback);
    
  }

  onRegister = (event) => {
    event.preventDefault();
    this.setState({ tab :'R' });
  }

  onBack = (event) => {
    event.preventDefault();
    this.setState({ tab :'L' });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name] : value });
  }

  onChangeOtp = (event) => {
    const { name, value } = event.target;
    if(value.length <= 6) {
      this.setState({ [name] : value });
    }
  }

  componentWillMount = () => {}

  componentDidMount = () => {}

  componentWillReceiveProps = (nextProps) => {}

  componentWillUpdate = (nextProps, nextState) => {}

  componentDidUpdate = () => {}

  componentWillUnmount = () => {
    clearInterval(this.otpExpireInterval);
  }

  renderRegister = () => {
    const { email, username, password, passwordConfirm} = this.state;
    return (
      <div className="form-container">
        <form className="register-form">
          <h2 className="title">Register</h2>
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
              type="password" 
              name="password"
              value={password} 
              placeholder="password"
              onChange={this.onChange}/>
          </div>
          <div className="input-field">
            <i className="fa fa-lock"></i>
            <input 
              type="password" 
              name="passwordConfirm"
              value={passwordConfirm} 
              placeholder="confirm password"
              onChange={this.onChange}/>
          </div>
          <div className="input-field">
            <i className="fa fa-envelope"></i>
            <input 
              type="text"
              name="email"
              value={email} 
              placeholder="email"
              onChange={this.onChange} />
          </div>
          <div className="two-fa">
            <Checkbox onChange={(e) =>{}} checked={true} label="Two factor authentication" />
          </div>
          
          <input 
            type="submit" 
            className="btn" 
            value="Confirm" 
            onClick={this.onLogin} />
          <a href="#" onClick={this.onBack}><strong>Back to Login</strong></a>
        </form>
      </div>
    )
  }

  renderLogin = () => {
    const { username, password} = this.state;
    return (
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
              type="password" 
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
          <a href="#" onClick={this.onRegister}><strong>Register</strong></a>
          <p className="social-text">Or Sign in with social platforms</p>
          <div className="social-media">
            <a href="#" className="social-icon"><i className="fa fa-github"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-google"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
          </div>
        </form>
      </div>
    )
  }

  render () {
    const { tab, otpExpire, isOpen, refId, otp, otpLodding } = this.state;
    return (
      <>
      <div className="container">
        { tab === 'L' ? this.renderLogin() : this.renderRegister() }
      </div>
      <Modal 
        lodding={otpLodding}
        otp={otp}
        otpExpire={otpExpire} 
        isOpen={isOpen}
        onChange={this.onChangeOtp}
        onSend={this.onLoginOtp}
        refId={refId} />
      </>
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
