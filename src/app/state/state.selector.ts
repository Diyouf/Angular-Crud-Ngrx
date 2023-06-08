import { UserData } from './state.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectUserState = createFeatureSelector<UserData[]>('user')

export const selectUserData = createSelector(selectUserState,(state:UserData[])=>state)
