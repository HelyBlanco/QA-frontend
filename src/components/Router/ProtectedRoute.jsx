import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProtectedRoute = ({children}) =>{
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    return (
        !isLoggedIn ? <Navigate to='/login'/> : children
    );
}

export default ProtectedRoute