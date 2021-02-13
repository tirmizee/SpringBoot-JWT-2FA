import Route from './components/Route'
import logo from './logo.svg';
import './App.scss';

import Login from './views/Login'

function App() {
  return (
    <div className="App">
      <Route path="/" ><Login/></Route>
    </div>
  );
}

export default App;
