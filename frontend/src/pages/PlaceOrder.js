import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import CartItems from "../components/CartItems";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Loading from "../components/Loading";
import Message from "../components/Message";

function PlaceOrder(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector(state => state.orderCreate)
  const { shippingAddress, cartItems } = cart;
  const { loading, error, success, order } = orderCreate;

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  );

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, order, props.history]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {shippingAddress.fullName}
                  <br />
                  <strong>Address: </strong> {shippingAddress.address},
                  {shippingAddress.city}, {shippingAddress.postalCode},
                  {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order items</h2>
                <CartItems cartItems={cartItems} />
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Order Sumary</h2>
              </li>
              <li>
                <div className='row'>
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>${cart.totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  className='primary block'
                  type='button'
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <Loading />}
              {error && <Message variant='danger'>{error}</Message>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
