import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CLEAR_ALL,
  CART_REMOVE_ITEM,
} from "../constants/cartConstant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // Store updated cart in localStorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

export const cartClearAll = () => (dispatch) => {
  try {
    dispatch({
      type: CART_CLEAR_ALL,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    console.log(error);
  }
};
