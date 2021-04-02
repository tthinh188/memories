import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData); // sending to backend server by axios

        dispatch({ type: 'AUTH', data }) // reducer implement this logic

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData); // sending to backend server by axios

        dispatch({ type: 'AUTH', data }) // reducer implement this logic

        history.push('/')
    } catch (error) {
        
    }
}