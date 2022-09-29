import React, {useEffect, useState} from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import API from '../api/api'

function AdminRoutes() {
  const [isAdmin, setIsAdmin] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const makeRequest = async () => {
        try{
            const response = await API.post('/permissions/admin/check')
            setIsAdmin(response.data.admin)
        } catch(err) {
            if(err.response.status){
                navigate('/', {replace: true})
            }
        }
    }
    makeRequest()
  }, [])
  const renderComponents = () => {
     if (isAdmin === undefined){
        return <p>Loading..</p>
     } else if (isAdmin){
        return <Outlet/>
     } else if (isAdmin === false) {
        return <Navigate to="/error/403"/>
     }
  }
  return (
     <>{renderComponents()}</>
  )
}

export default AdminRoutes