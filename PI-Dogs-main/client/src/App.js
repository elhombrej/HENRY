import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home"
import DogDetails from "./components/DogDetails"


function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <BrowserRouter>
        <Route exact path={"/"} component={Home} />
        {/* <Route exact path='/buscar' component={Buscar}/> */}
        <Route exact path= '/DogDetails/:id' component= {DogDetails}/>
        {/* <Route exact path= "/agregarperro" component= {AgregarPerro}/> */}
      </BrowserRouter>

    </div>
  );
}

export default App;