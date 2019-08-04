import { combineReducers } from 'redux'
import {
  REQUEST_USER,
  REQUEST_AREAS,
} from './actions'

//*********************************************** */
function selectedUser(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        user: action.user,
      })
    default:
      return state
  }
}




// function areas(
//   state = {
//     isFetching: false,
//     didInvalidate: false,
//     user: null,
//     lastUpdated: null
//   },
//   action
// ) {
//   switch (action.type) {
//     case INVALIDATE_USERDATA:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_AREAS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_USER:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         user: action.user,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }

function userAreas(state = {}, action) {
  switch (action.type) {
    case REQUEST_AREAS:
      return Object.assign({}, state, {
        lastUpdated: action.receivedAt,
        user: action.user,
        areas: action.areasForWheel
      })
    default:
      return state
  }
}


/************************************************ */

const rootReducer = combineReducers({
  userAreas,
  selectedUser
})


export default rootReducer