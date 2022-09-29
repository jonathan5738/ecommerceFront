import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

function ProtectedRoutes() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))
  return (
    currentUser ? <Outlet/>: <Navigate to="/accounts/login"/>
  )
}

export default ProtectedRoutes