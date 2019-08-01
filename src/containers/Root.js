import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { selectUser, fetcharea } from '../actions'
import AsyncApp from './AsyncApp'

const store = configureStore()

store.dispatch(selectUser('SomeUser'))
store.dispatch(fetcharea('reactjs')).then(() => console.log(store.getState()))

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}