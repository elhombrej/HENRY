import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <h2>Proyecto Individual</h2>

      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route exact path= '/home' component= {Home}/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
