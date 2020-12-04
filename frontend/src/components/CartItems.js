import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartItems({ cartItems, editable }) {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <ul>  
    {cartItems.map((item) => (
        <li key={item.product}>
          <div className='row'>
            <div>
              <img src={item.image} alt={item.name} className='small' />
            </div>
            <div className='min-30'>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </div>
            <div>
              {editable && (
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.idProduct, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              {editable
                ? `$${item.price}`
                : `${item.qty} x $${item.price} = $${item.qty * item.price}`}
            </div>
            {editable && (
              <div>
                <button
                  type='button'
                  onClick={() => removeFromCartHandler(item.idProduct)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
      </ul>
  );
}

export default CartItems;
