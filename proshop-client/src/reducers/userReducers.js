import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = {}, {type, payload}) => {
  switch(type) {
      case USER_LOGIN_REQUEST:
          return { loading: true, ...state};
      case USER_LOGIN_SUCCESS:
          return { loading: false, userInfo: payload};
      case USER_LOGIN_FAIL:
          return { loading: false, error: payload}
      case USER_LOGOUT:
        return {}
      default:
          return state;
  }
}


export const userRegisterReducer = (state = {}, {type, payload}) => {
  switch(type) {
      case USER_REGISTER_REQUEST:
          return { loading: true, ...state};
      case USER_REGISTER_SUCCESS:
          return { loading: false, userInfo: payload};
      case USER_REGISTER_FAIL:
          return { loading: false, error: payload}
      default:
          return state;
  }
}


export const userDetailsReducer = (state = { user: {} }, {type, payload}) => {
  switch(type) {
      case USER_DETAIL_REQUEST:
          return { loading: true, ...state};
      case USER_DETAIL_SUCCESS:
          return { loading: false, user: payload};
      case USER_DETAIL_FAIL:
          return { loading: false, error: payload}
      default:
          return state;
  }
}


export const userUpdateProfileReducer = (state = { }, {type, payload}) => {
  switch(type) {
      case USER_UPDATE_PROFILE_REQUEST:
          return { loading: true, ...state};
      case USER_UPDATE_PROFILE_SUCCESS:
          return { loading: false, success: true, userInfo: payload};
      case USER_UPDATE_PROFILE_FAIL:
          return { loading: false, error: payload}
      case USER_UPDATE_PROFILE_RESET:
        return {}
      default:
          return state;
  }
}