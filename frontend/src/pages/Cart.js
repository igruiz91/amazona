import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import CartItems from "../components/CartItems";

function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    props.history.push(`/signin?redirect=shipping`);
  };

  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            Your Amazona Cart is empty. <Link to='/'>Continue Shopping.</Link>
          </Message>
        ) : (
          <CartItems cartItems={cartItems} editable />
        )}
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
                : $
                {cartItems.reduce(
                  (acc, curr) => acc + curr.price * curr.qty,
                  0
                )}
              </h2>
            </li>
            <li>
              <button
                type='button'
                onClick={checkoutHandler}
                className='primary block'
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;
