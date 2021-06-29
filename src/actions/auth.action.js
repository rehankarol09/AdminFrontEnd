//import {authConstants} from './constants'

import axios from '../helpers/axios';
import { authConstants } from "./constants";

export const login = (user) => {
    console.log(user);
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });

        const res = await axios.post('/admin/signin',
            {
                ...user
            });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            }
            )
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error:"Login Cannot be performed"
                    }
                })
            }
        }
    }
};


export const isUserLogin = () => {

    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            }
            )
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error:"Login Cannot be performed"
                }
            })
        }

    }
}