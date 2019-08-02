import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import SiderDemo from './components/SiderDemo/Index'
import 'antd/dist/antd.css';
const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <SiderDemo />
    </Provider>
  );
}

export default App;
