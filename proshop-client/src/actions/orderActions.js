import axios from 'axios'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async(dispatch, getState) => {
  try {
    const {userInfo: { token }} = getState().userLogin
    dispatch({ type: ORDER_CREATE_REQUEST })
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`}
    }
    const { data } = await axios.post('/orders', order, config)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: ORDER_CREATE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}

export const getOrderDetails = (orderId) => async(dispatch, getState) => {
  try {
    console.log("object")
    const { userInfo:{token} } = getState().userLogin

    dispatch({ type: ORDER_DETAILS_REQUEST })

    const config = { headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}}

    const { data } = await axios.get(`/orders/${orderId}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
    

  } catch (error) {
    
    dispatch({ 
      type: ORDER_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })

  }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })
    const { userInfo: {token} } = getState().userLogin;
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.put(`/orders/${orderId}/pay`, paymentResult, config);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listMyOrders = () => async(dispatch, getState) => {
  const { userInfo: { token } } = getState().userLogin
  const config = { 
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })
    const { data } = await axios.get('/orders/myorders', config);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type : ORDER_LIST_MY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}