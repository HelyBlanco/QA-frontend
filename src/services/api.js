import axios from 'axios'
import { logout } from '../store/actions/auth'
import store from '../store'

const API = axios.create({
    baseURL:'http://127.0.0.1:3000',
    headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token') || ''}`
    }
})

API.interceptors.response.use(
    res =>{
        return res
    },

    err =>{
        
        if(typeof err.response === 'undefined')
        {
            store.dispatch(logout())
            throw err
        }

        if (err.response.status !== 401){
            store.dispatch(logout())
            throw err
        }
        if(typeof err.response.data.error.name !== 'undefined'){
            if(err.response.data.error.name === 'TokenExpiredError'){
                store.dispatch(logout())
                throw err
            }

            store.dispatch(logout())
            throw err
        }
    }
)

export default API