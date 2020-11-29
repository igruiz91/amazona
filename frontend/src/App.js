import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Signin from "./pages/Signin";

function App() {

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart


  return (
    <Router>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              Amazona
            </Link>
          </div>
          <div>
            <Link to='/cart'>Cart
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
            </Link>
            <Link to='/signin'>Sign In</Link>
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={Signin}></Route>
          <Route path='/product/:id?' component={ProductPage}></Route>
          <Route path='/cart/:id?' component={Cart}></Route>
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
