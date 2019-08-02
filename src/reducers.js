import { combineReducers } from 'redux'
import {
  INVALIDATE_USERDATA,
  REQUEST_USER,
  RECEIVE_USER,
} from './actions'

//*********************************************** */
// function selectedUser(state = null, action) {
//   switch (action.type) {
//     case SELECT_USERDATA:
//       return action.user.name
//     default:
//       return state
//   }
// }

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
//     case REQUEST_USER:
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

function userData(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_USERDATA:
    case RECEIVE_USER:
    case REQUEST_USER:
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
  userData
})

export default rootReducer