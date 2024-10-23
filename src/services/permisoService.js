import API from './api'

const PermisoService = {
    registrar:(data) =>{
        return API.post('/permisos/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/permisos/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/permisos/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerPermiso:(data)=>{
        return API.post('/permisos/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarPermiso:(data)=>{
        return API.post('/permisos/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default PermisoService