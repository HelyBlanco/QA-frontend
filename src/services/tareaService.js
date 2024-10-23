import API from './api'

const TareaService = {

    actualizar:(data)=>{
        return API.post('/tareas/update',data)
            .then(({data}) =>{
                return data
            })
    },

    obtenerTarea:(data)=>{
        return API.post('/tareas/search',data)
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },

    eliminarEstado:(data)=>{
        return API.post('/tareas/delete',data)
            .then(({data}) =>{
                return data
            })
    }
}

export default TareaService