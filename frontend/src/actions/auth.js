import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT, 
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    PROFILE_LOADED_SUCCESS,
    PROFILE_LOADED_FAIL
} from './types';

export const checkAuthenticated = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token });
        try {
            const res = await axios.post('/auth/jwt/verify/', body, config);
            
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const load_user = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get('/auth/users/me/', config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try {
        const res = await axios.post('/auth/users/', body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post('/auth/users/activation/', body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/login-token/', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const reset_password = email => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post('/auth/users/reset_password/', body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post('/auth/users/reset_password_confirm/', body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
}

export const load_profile = (id, email) => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`/api/profile?email=${email}&id=${id}`, config);
            
            dispatch({
                type: PROFILE_LOADED_SUCCESS,
                payload: res.data
            });
        } catch(err) {
            dispatch({
                type: PROFILE_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: PROFILE_LOADED_FAIL
        });
    }
};

export const unload_profile = dispatch => {
    dispatch({
        type: PROFILE_LOADED_FAIL
    });
};

export const logout = dispatch => {
    dispatch({
        type: LOGOUT
    });
};