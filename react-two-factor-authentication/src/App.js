import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute/ProtectedRoute'
import logo from './logo.svg';
import './App.scss';

import Login from './views/Login'
import Main from './views/Main'

class App extends  React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/login"  component={Login} />
          <ProtectedRoute path="/" component={Main} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
