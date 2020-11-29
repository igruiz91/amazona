import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <a className='brand' href='/'>
              amazona
            </a>
          </div>
          <div>
            <a href='/cart'>Cart</a>
            <a href='/signin'>Sign In</a>
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id?' component={ProductPage}></Route>
          <Route path='/cart/:id' component={Cart}></Route>
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
