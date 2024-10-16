import axios from "axios";
import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstant";
import { CART_CLEAR_ALL } from "../constants/cartConstant";

export const userLoginAction = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userDetailAction = () => async (dispatch, getState) => {
  dispatch({ type: USER_DETAIL_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/user/profile`, config);
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfileAction = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`api/user/profile`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogOutAction = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CART_CLEAR_ALL });
};
