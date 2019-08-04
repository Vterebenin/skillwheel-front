import fetch from 'cross-fetch'
import { encode_utf8 } from './components/helpers/Index'

export const REQUEST_AREAS = 'REQUEST_AREAS'
export const REQUEST_USER = 'REQUEST_USER'
export const GET_SKILL = 'GET_SKILL'

// ************************
// ! REQUEST_USER START
// ************************
function receiveUser(json) {
  return {
    type: REQUEST_USER,
    user: json,//.map(child => child.name),
  }
}

export function fetchData(receive) {
  return dispatch => {
    return fetch(`https://raw.githubusercontent.com/Vterebenin/skillwheel-front/master/fetchedData.json`)
      .then(response => response.json())
      .then(text => {
        text = JSON.parse(encode_utf8(encode_utf8(text.toString())))
        return text
      }).then(json => dispatch(receive(json)))

  }
}

function shouldFetchUser(state) {
  const { user } = state.selectedUser
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchUserIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUser(getState())) {
      return dispatch(fetchData(receiveUser))
    }
  }
}

// ************************
// ! REQUEST_USER END
// ************************


// ************************
// ! REQUEST_AREAS START
// ************************

function receiveAreas(json) {
  return {
    type: REQUEST_AREAS,
    user: json,//.map(child => child.name),
    areasForWheel: transformAreasForWheel(json),
    receivedAt: Date.now()
  }
}

function shouldFetchArea(state) {
  const { user } = state.userAreas
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
      return dispatch(fetchData(receiveAreas))
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

// ************************
// ! REQUEST_AREAS END
// ************************

// ************************
// !GET_SKILL END
// ************************

export function getSkill(skillId) {
  return (dispatch, getState) => {
    const { user } = getState().userAreas;
    let currentSkill = findSkill(user, skillId);
    dispatch(getCurrentSKill(skillId, currentSkill));
  }
}

function getCurrentSKill(skillId, currentSkill) {
  return {
    type: GET_SKILL,
    skillId: skillId,
    currentSkill: currentSkill,
    // skillObj: searchObj(user, skillId),
  }
}

function findSkill(obj, id) {
  let prevObj = {}
  let tarObj = null

  function searchObj(obj, id) {

    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object') {
        if ((obj !== null) && (obj.hasOwnProperty('skill'))) {
          prevObj = obj

        }
        searchObj(value, id);
      }
      if (key === "id") {
        if (value === id) {
          tarObj = prevObj
        }
      }
    }
  }
  searchObj(obj, id)
  return tarObj
}

