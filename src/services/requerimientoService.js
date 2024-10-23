import API from './api'

const RequerimientoService = {
    etapas:() =>{
        return API.get('/requerimiento/etapas')
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    usuarios:() =>{
        return API.get('/requerimiento/usuarios')
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },
    detalle:(data) =>{
        return API.post('/requerimiento/detail',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },
    registrar:(data) =>{
        return API.post('/requerimiento/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:(data)=>{
        return API.post('/requerimiento/list',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/requerimiento/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerRequerimiento:(data)=>{
        return API.post('/requerimiento/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    obtenerEstadoRequerimiento:(data)=>{
        return API.post('/requerimiento/getEstado',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizarEstado:(data) =>{
        return API.post('/requerimiento/setEstado',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarSistema:(data)=>{
        return API.post('/requerimiento/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default RequerimientoService