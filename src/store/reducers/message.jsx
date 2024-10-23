import { MESSAGE } from '../types/index'

const initialState = {
    detailMessage:'',
    color:'',
    showMessage:false,
}

const messageReducer = (state = initialState, action) =>{
    const {type, payload} = action
    
    switch(type){
        case MESSAGE: 
            return {
                ...state,
                detailMessage:payload.detailMessage,
                color:payload.color,
                showMessage:payload.showMessage,
            }
            
        default:{
            return state
        }
    }
}

export default messageReducer