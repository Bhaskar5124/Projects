import React, { Fragment } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import { Outlet } from 'react-router-dom'
import Search from './components/Search'

function App() {
  return (
    <Fragment>
      <Outlet />
      {/* <Search/> */}
    </Fragment>
  )
}

export default App