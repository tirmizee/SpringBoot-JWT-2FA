import Axios from 'axios';

class AuthService { 

  constructor() {
    this.authenticated = false;
  }

  login(data) {
    const headers = { 'Authorization' : `Basic ${data}` };
    return Axios.post('http://localhost:9000/auth/token', {}, {headers});
  }

  logout(callback) {
    this.authenticated = false;
    callback();
  }

  setAuthenticated(authenticated) {
    this.authenticated = authenticated;
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

export default new AuthService();
