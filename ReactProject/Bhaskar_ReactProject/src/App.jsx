import React, { Fragment } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appstore from './utils/appstore';


function App() {
  return (
    <Provider store={appstore}>
      <div>
        <Header/>
        <Outlet/>
      </div>
    </Provider>
    
  )
}

export default App