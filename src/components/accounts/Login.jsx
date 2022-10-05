import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { FiX } from "react-icons/fi"
import { loginUser } from '../../actions/auth'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [closeErrorMessage, setCloseErrorMessage] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
        dispatch(loginUser({username, password}))
        setUsername(''); setPassword('')
    }
  }, [formErrors])

  const variants = {
     initial: {y: '100%', opacity: 0},
     visible: {y: 0, opacity: 1}
  }

  const handleSubmit = e => {
     e.preventDefault()
    setFormErrors(validate({username, password}))
    setIsSubmit(true)
    setCloseErrorMessage(false)
  }
  const validate = data => {
     const errors = {}
     if(!data.username) errors.username = 'username required' 
     if(!data.password) errors.password = 'password required'
     return errors
  }
  return (
    <div className='form-section'>
        <div className="form-container">
            {auth.status === 'failed' && (
                <ErrorModal variants={variants}
                  state={auth}
                   setCloseErrorMessage={setCloseErrorMessage}
                   closeErrorMessage={closeErrorMessage}
                />
            )} 
            {auth.status === 'succeed' && (
                <SuccessModal 
                  state={auth}
                  closeErrorMessage={closeErrorMessage}
                  setCloseErrorMessage={setCloseErrorMessage}
                  message="successfully logged in"
                  variants={variants} 
                  />
            )}
            <h3>Log in </h3>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} placeholder='username' aria-label='username'
                    onChange={e => setUsername(e.target.value)}/>
                    <span className="form-error">{formErrors?.username}</span>
                </div>
                <div>
                    <input type="password" value={password} placeholder='password' aria-label='password'
                    onChange={e => setPassword(e.target.value)}/>
                    <span className="form-error">{formErrors?.password}</span>
                </div>
                <button>login</button>
            </form>
            <div className="oauth-container">
             <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth/google`}>continue with google</a>
        </div>
        <p>Don't already have an account? <Link to="/accounts/signin">sign in</Link></p>
        </div>
    </div>
  )
}

export default Login