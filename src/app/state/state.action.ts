import { createAction, props } from '@ngrx/store';
import { UserData } from './state.interface'

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: UserData }>());

export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());
