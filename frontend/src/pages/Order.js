import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../actions/orderActions";
import CartItems from "../components/CartItems";
import Loading from "../components/Loading";
import Message from "../components/Message";

function Order(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [orderId, dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.shippingAddress.fullName}
                  <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered at {order.deliveredAt}{" "}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>
                    Paid at {order.paidAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order items</h2>
                <CartItems cartItems={order.orderItems} />
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
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>${order.totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;