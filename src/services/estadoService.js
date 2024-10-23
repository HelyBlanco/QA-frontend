import API from './api'

const EstadoService = {
    registrar:(data) =>{
        return API.post('/estados/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/estados/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/estados/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerEstado:(data)=>{
        return API.post('/estados/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarEstado:(data)=>{
        return API.post('/estados/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default EstadoService