import React from 'react'

function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1

  return (
    <div>
      <h1>Cart Page</h1>
      <p>Add to cart : productID: {productId} qty: {qty}</p>
    </div>
  );
}

export default Cart
