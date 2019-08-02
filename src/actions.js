import fetch from 'cross-fetch'
import { encode_utf8 } from './components/helpers/Index'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const SELECT_USERDATA = 'SELECT_USERDATA'
export const INVALIDATE_USERDATA = 'INVALIDATE_USERDATA'

//  TESTING THINGS

function requestUser(User) {
  return {
    type: REQUEST_USER,
    user: User
  }
}

function receiveAreas(json) {
  return {
    type: REQUEST_USER,
    user: json,//.map(child => child.name),
    areasForWheel: transformAreasForWheel(json),
    receivedAt: Date.now()
  }
}

export function fetchArea() {
  return dispatch => {
    dispatch(requestUser())
    return fetch(`https://raw.githubusercontent.com/Vterebenin/skillwheel-front/master/fetchedData.json`)
			.then(response => response.json())
      .then(text => {
        text = JSON.parse(encode_utf8(encode_utf8(text.toString())))
        return text
			}).then(json => dispatch(receiveAreas(json)))
			
  }
}
 

function shouldFetchArea(state) {
	const { user } = state.userData
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchAreaIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArea(getState())) {
      return dispatch(fetchArea())
    }
  }
}

function transformAreasForWheel(json) {
  let transformedAreas = null;
  if (json.id !== null) {
    const data = json
    transformedAreas = data
    transformedAreas.children = []
    for (let [key] of Object.entries(data.areas)) {
      const pushObj = {}
      pushObj.color = data.areas[key].color
      pushObj.title = data.areas[key].title
      pushObj.children = data.areas[key].skills
      transformedAreas.children.push(pushObj)
    }
    transformedAreas.children.forEach(element => {
      Object.keys(element.children).map((key) => {
        element.children[key].value = 2
        element.children[key].id = element.children[key].skill.id
        element.children[key].color = element.children[key].level.color
        element.children[key].title = element.children[key].skill.title
        return element
      })
    });
  }

  return transformedAreas
}

