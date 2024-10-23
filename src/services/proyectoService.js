import API from './api'

const ProyectoService = {
    registrar:(data) =>{
        return API.post('/proyectos/create',data)
        .then(({data}) =>{
            return data
        })
        .catch(err =>{
            console.log("Auth service err", err)
        })
    },

    listar:()=>{
        return API.get('/proyectos/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    actualizar:(data)=>{
        return API.post('/proyectos/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerProyecto:(data)=>{
        return API.post('/proyectos/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarProyecto:(data)=>{
        return API.post('/proyectos/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default ProyectoService