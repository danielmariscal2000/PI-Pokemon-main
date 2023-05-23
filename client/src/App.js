import {BrowserRouter,Route,Routes} from "react-router-dom";
import LadingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail.jsx";
import PokemonCreate from "./components/PokemonCreate/PokemonCreate";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route exact path='/create' Component={PokemonCreate} />
        <Route exact path="/home/:id" Component={Detail}></Route>
        <Route exact path="/" Component={LadingPage}></Route>
        <Route exact path="/home" Component={Home}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
