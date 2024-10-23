import API from './api'

const WorkspaceService = {
    listar:()=>{
        return API.get('/workspace/list')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    obtenerModulo:(data)=>{
        return API.post('/workspace/detalle-modulo',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    agregarTarea:(data)=>{
        return API.post('/workspace/agregar-tarea',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },
}

export default WorkspaceService