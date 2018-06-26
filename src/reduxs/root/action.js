// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'

export const initialComplete = (tag = null) => dispatch => {
  setTimeout( () => 
    dispatch(createAction(types.ROOT_INITIAL_COMPLETE, tag))
  , 1500)
}

export const initialProgress = (pending, tag = null) => dispatch => {
  setTimeout( () => 
    dispatch(createAction(types.ROOT_INITIAL_PENDING, { pending, tag }))
  , 800)
}
