import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import DogDetails from "./components/DogDetails"
import AboutMe from './components/AboutMe';
import Home from './components/Home';
import DogCreate from './components/DogCreate';


function App() {
  return (
      <BrowserRouter>
          <div className="App">
        <h1>Henry Dogs!</h1>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        {/* <Route exact path= '/dogdetails/:id' component= {DogDetails}/> */}
        <Route exact path={"/aboutme"} component={AboutMe} />
        <Route exact path='/dog' component={DogCreate} />
        {/* <Route exact path= "/agregarperro" component= {AgregarPerro}/> */}
        {/*<Route exact path='/buscar' component={Buscar}/>*/}
        </div>
      </BrowserRouter>
  );
}

export default App;