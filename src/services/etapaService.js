import API from './api'

const EtapaService = {
    registrar:(data) =>{
        return API.post('/etapas/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/etapas/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/etapas/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerEtapa:(data)=>{
        return API.post('/etapas/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarEtapa:(data)=>{
        return API.post('/etapas/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default EtapaService