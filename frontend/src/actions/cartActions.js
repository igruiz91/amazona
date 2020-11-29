import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  const { name, image, price, countInStock } = data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name,
      image,
      price,
      countInStock,
      product: data._id,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
