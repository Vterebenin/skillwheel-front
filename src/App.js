import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import MainLayout from './components/MainLayout/Index'
import 'antd/dist/antd.css';

export const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}

export default App;
