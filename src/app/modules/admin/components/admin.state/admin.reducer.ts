import { getUser } from './admin.interface'
import { createReducer, on } from '@ngrx/store'
import * as userAction from './admin.action'



const intiialState : getUser[] = []

const userGetReducer = createReducer(
    intiialState,
    on(userAction.loadAllUserSuccess, (_state, { alluser }) => {
        return Object.values(alluser[0]) 
    })
)

export function _userGetReducer(state:any,action:any){
    return userGetReducer(state,action)
}