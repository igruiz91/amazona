import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Cart Page</h1>
      <p>
        Add to cart : productID: {productId} qty: {qty}
      </p>
    </div>
  );
}

export default Cart;
