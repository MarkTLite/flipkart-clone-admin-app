import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

//intercept a request before it is handled by then or catch eg when still using the expired jwt token 
axiosIntance.interceptors.request.use((req) => {
    const { auth } = store.getState()
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

//intercept a response before it is handled by then or catch eg when the jwt token expires
axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        //signout procedure to cause signin prompt 
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
})

export default axiosIntance;