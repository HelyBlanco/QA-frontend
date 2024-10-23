import API from './api'

const SistemaService = {
    registrar:(data) =>{
        return API.post('/sistemas/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/sistemas/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/sistemas/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerSistema:(data)=>{
        return API.post('/sistemas/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarSistema:(data)=>{
        return API.post('/sistemas/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default SistemaService