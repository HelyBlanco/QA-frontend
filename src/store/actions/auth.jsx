import AuthService from '../../services/authService'
import { useNavigate } from 'react-router-dom';
import {LOGIN, LOGOUT} from '../types/index'

export const login = (params, navigateTo) => dispatch => {
    return AuthService.login(params)
            .then(data =>{
                dispatch({type:LOGIN, payload:data})
                navigateTo('/')
            })
            .catch(err =>{
                
            })
}


export const logout = () => dispatch =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('menu')
    dispatch({ type: LOGOUT })
}