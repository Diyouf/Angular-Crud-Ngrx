import { getUser } from './admin.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectUserState = createFeatureSelector<getUser[]>('Alluser')

export const selectAllUserData = createSelector(selectUserState, (state: getUser[]) => { return state })


