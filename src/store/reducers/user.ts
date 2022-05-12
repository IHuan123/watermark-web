import { SET_USER, CLEAR_USER } from "../constants/user"
import {User} from "../actions/user"

interface Defaulter {
    user:User|null,
    token:any
}
const defaultState:Defaulter = {
    user:{
        id:1000,
        uid:100215,
        name:'lilei',
        age:20,
        gender:1,
    },
    token:null
}
type ActionType = SET_USER | CLEAR_USER
interface Actioner{
    type: ActionType
    value: any
}
const userReducer = (state = defaultState , actions:Actioner)=>{
    let copyState = Object.assign({}, state)
    switch(actions.type){
        case SET_USER:
            copyState.user = actions.value
            return 
        case CLEAR_USER:
            copyState.user = null
            return
        default :
            return copyState 
    }
}
export default userReducer