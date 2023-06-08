import { UserData, userState } from './state.interface'
import { createReducer, on } from '@ngrx/store'
import * as userAction from './state.action'



const intiialState : UserData[] = []

const authReduce = createReducer(
    intiialState,
    on(userAction.loadUserSuccess, (state, { user }) => {
        return [...Object.values(user)]
        
    })  
)

export function _authReducer(state:any,action:any){
    return authReduce(state,action)
}