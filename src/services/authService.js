import API from './api'

const AuthService = {
    login:(data) =>{
        return API.post('/login',data)
        .then(({data}) =>{
            setHeadersAndStorage(data)
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    register:(data) =>{
        return API.post('/register',data)
        .then(({data}) =>{
            setHeadersAndStorage(data)
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    updateProfile:(data) =>{
        
        const headers = {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }

        return API.post('/users/update',data, headers)
        .then(({data}) =>{
            localStorage.setItem('user', JSON.stringify(data))
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    logout: () =>{
        API.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('menu')
    }
}

const setHeadersAndStorage = ({user, token, permisos}) =>{
    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    localStorage.setItem('menu',JSON.stringify(permisos))
}

export default AuthService