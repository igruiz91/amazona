import React from "react";
import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
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
    //dispatch place order
  };

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
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
