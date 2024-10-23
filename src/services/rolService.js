import API from './api'

const RolService = {
    registrar:(data) =>{
        return API.post('/roles/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/roles/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/roles/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerRol:(data)=>{
        return API.post('/roles/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarRol:(data)=>{
        return API.post('/roles/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default RolService