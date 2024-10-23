import API from './api'

const UsuarioService = {
    registrar:(data) =>{
        return API.post('/usuarios/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/usuarios/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/usuarios/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerUsuario:(data)=>{
        return API.post('/usuarios/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarUsuario:(data)=>{
        return API.post('/usuarios/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default UsuarioService