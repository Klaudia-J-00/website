import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET
} from "../Constants/UserConstants"
import axios from "axios"

// login action 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const { data } = await axios.post(
            "/api/users/login/",
            {email, password},
            config
        )
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

// logout action 
export const logout = (email, password) => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
    document.location.href = "/login"
}

// register action
export const register = (name, surname, email, password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            },
        }

        const { data } = await axios.post(
            "/api/users",
            {name, surname, email, password},
            config
        )
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

// user details action
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error){
        const message = error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
                if(message === "Not authorized, token failed"){
                    dispatch(logout())
                }
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:message
        })
    }
}