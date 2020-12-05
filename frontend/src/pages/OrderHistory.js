import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

function OrderHistory(props) {
  const dispatch = useDispatch()
  const orderMineList = useSelector((state) => state.orderMineList);
  const { error, loading, orders } = orderMineList;

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='table'>
          <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.idPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.isDelivered.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      className='small'
                      type='button'
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
