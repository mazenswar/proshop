import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

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
        case USER_DETAIL_RESET:
            return { user: {} }
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


export const userListReducer = (state = { users: [] }, {type, payload}) => {
    switch(type) {
        case USER_LIST_REQUEST:
            return { loading: true, ...state }
        case USER_LIST_SUCCESS:
            return { loading: false, users: payload }
        case USER_LIST_FAIL:    
            return { loading: false, error: payload }
        case USER_LIST_RESET:
            return { users: [] } 
        default:
            return state;
    }
}


export const userDeleteReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case USER_DELETE_REQUEST:
            return { loading: true, ...state }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:    
            return { loading: false, error: payload }
        default:
            return state;
    }
}