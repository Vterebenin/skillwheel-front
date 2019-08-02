import fetch from 'cross-fetch'
import { encode_utf8 } from './components/helpers/Index'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const SELECT_USERDATA = 'SELECT_USERDATA'
export const INVALIDATE_USERDATA = 'INVALIDATE_USERDATA'


export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}

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
    receivedAt: Date.now()
  }
}

export function fetcharea() {
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
	const { user } = state.areasByUser
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchareaIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArea(getState())) {
      return dispatch(fetcharea())
    }
  }
}

