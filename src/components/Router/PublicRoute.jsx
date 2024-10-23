import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

const PublicRoute = ({children}) =>{
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    return (
        isLoggedIn ? <Navigate to='/'/> : children
    );
}

export default PublicRoute