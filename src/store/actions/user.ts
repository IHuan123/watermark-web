import { SET_USER,CLEAR_USER } from "../constants/user"
export interface User {
    id:number
    uid:number
    name:string
    age:number
    gender:number
}
export interface SET_USERAction{
    type:string
    value: User
}
export const userActions:(user:User) => SET_USERAction = (user)=>{
    return {
        type:SET_USER,
        value:user
    }
}

export interface CLEAR_USERAction{
    type: typeof CLEAR_USER
}
export const clearUserActions:()=>CLEAR_USERAction = ()=>{
    return {
        type: CLEAR_USER
    }
}