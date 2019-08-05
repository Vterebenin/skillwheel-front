import { combineReducers } from 'redux'
import {
  REQUEST_USER,
  REQUEST_AREAS,
  GET_SKILL
} from './actions'

//*********************************************** */
function selectedUser(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

function userAreas(state = {}, action) {
  switch (action.type) {
    case REQUEST_AREAS:
      return {
        ...state,
        lastUpdated: action.receivedAt,
        user: action.user,
        areas: action.areasForWheel
      }
    default:
      return state
  }
}

function skillOfClickedArea(state = {}, action) {
  switch (action.type) {
    case GET_SKILL:
      return {
        ...state,
        skillId: action.skillId,
        currentSkill: action.currentSkill
      }
    default:
      return state
  }
}


/************************************************ */

const rootReducer = combineReducers({
  userAreas,
  skillOfClickedArea,
  selectedUser
})


export default rootReducer