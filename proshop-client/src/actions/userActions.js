import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

import { USER_DELETE_REQUEST, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from '../constants/userConstants';

export const login = (email, password) => async(dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: {'Content-Type': 'application/json'} };

    const { data } = await axios.post('/users/login', {email, password}, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data));
    
  } catch (err) {

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const logout = () => async(dispatch) => {
  // localStorage.removeItem('userInfo');
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET });
}

///// REGISTER

export const registerUser = (name, email, password) => async(dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: {'Content-Type': 'application/json'} };

    const { data } = await axios.post('/users', {name, email, password}, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data));
    
  } catch (err) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const getuserDetails = (id) => async(dispatch, getState) => {
  try {
    const {userLogin: { userInfo } } = getState()

    dispatch({ type: USER_DETAIL_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/users/${id}`, config);

    dispatch({ 
      type: USER_DETAIL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
  try {
    const {userLogin: {userInfo}} = getState()

    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put('/users/profile', user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const getUsers = () => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const { token } = getState().userLogin.userInfo
    const config = {
      headers: {
        'Content-Type': 'appliation/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.get('/users', config)
    dispatch({ 
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const deleteUser = id => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    const {token} = getState().userLogin.userInfo
    const config = { 
      headers: 
      { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`/users/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({ 
      type: USER_DELETE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}