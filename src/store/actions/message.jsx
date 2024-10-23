import { MESSAGE } from '../types/index'

export const detailMessage = (params) => dispatch => {
    return dispatch({type:MESSAGE, payload:params})
}