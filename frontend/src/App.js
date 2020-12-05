import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
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
                  <li>
                    <Link to='/profile'>User Profile</Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'>Order history</Link>
                  </li>
                  <li>
                    <Link to='#signout' onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/cart/:id?' component={Cart}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/signin' component={Signin}></Route>
          <Route path='/shipping' component={Shipping}></Route>
          <Route path='/orderhistory' component={OrderHistory}></Route>
          <Route path='/order/:id' component={Order}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/product/:id' component={ProductPage}></Route>
          <Route path='/profile' component={Profile}></Route>
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
