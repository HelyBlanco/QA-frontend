import API from './api'

const ReporteService = {

    listarRequerimientos:()=>{
        return API.get('/reportes/listarRequerimientos')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },
    listarTareas:()=>{
        return API.get('/reportes/listarTareas')
            .then(({data}) =>{
                return data
            })
            .catch(err =>{
                console.log("Auth service err", err)
            })
    },
}

export default ReporteService