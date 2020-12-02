import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import Signin from "./pages/Signin";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signout())
  };
  
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
            <Link to='/cart'>
              Cart
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>
                  {userInfo.name} <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signOutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={Signin}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/shipping' component={Shipping}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/product/:id?' component={ProductPage}></Route>
          <Route path='/cart/:id?' component={Cart}></Route>
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
