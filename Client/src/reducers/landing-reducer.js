import {CREATE_USER} from '../actions/CONST';
const initialState = {
    signUpdata : {}
}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case CREATE_USER:
            return Object.assign({}, state, {signUpdata: payload})
        default:
            return state; 
    }
}