import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUser } from '../../actions/auth'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'
import validator from 'validator'

function SignIn() {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [closeErrorMessage, setCloseErrorMessage] = useState(false)
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const variants = {
    initial: {y: '100%', opacity: 0},
    visible: {y: 0, opacity: 1}
 }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
        const data = {
            username, first_name: firstName,
            last_name: lastName, email, password
        }
        dispatch(signUser(data))
        setUsername(''); setFirstName(''); setLastName(''); setEmail('')
        setPassword('')
    }
  }, [formErrors])

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
        username, first_name: firstName,
        last_name: lastName, email, password
    }
    setFormErrors(validate(data))
    setIsSubmit(true)
  }
  const validate = data => {
     const errors = {}
     if(!data.username) errors.username = 'username required'
     if(data?.username?.length <= 4) errors.username = 'username must have more than 4 characters'
     if(data.username === firstName || data.username === lastName){
        errors.username = 'username must not match first name or last name'
     }
     if(!data.first_name) errors.firstname = 'first name required'
     if(!data.last_name) errors.lastname = 'last name required'
     if(!data.email) errors.email = 'email required'
     if(!validator.isEmail(data.email)) errors.email = 'invalid email'

     if(!data.password) errors.password = 'password required'
     if(data.password.length < 5){
        errors.password = 'passsword must be at least 5 characters long'
     }
     const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ 
     if(!specialChars.test(data.password)) {
        errors.password = 'password must contains at least special characters'
     }
     return errors
  }

  return (
    <div className='form-section'>
        <div className="form-container signin-container">
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
                  message="successfully signed in"
                  variants={variants} 
                />
            )}

            <h3>Sign in </h3>
            <form className='form'  onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} placeholder='username' aria-label='username'
                    onChange={e => setUsername(e.target.value)}/>
                    <span className="form-error">{formErrors?.username}</span>
                </div>
                <div>
                    <input type="email" value={email} placeholder='email' aria-label='email'
                    onChange={e => setEmail(e.target.value)}/>
                    <span className="form-error">{formErrors?.email}</span>
                </div>
                <div>
                        <div className='multiple-field'>
                            <input type="text" value={firstName} placeholder='first name' aria-label='first name'
                                onChange={e => setFirstName(e.target.value)}/>
                            
                            <input type="text" value={lastName} placeholder='last name' aria-label='last name'
                                onChange={e => setLastName(e.target.value)}/>
                        </div>
                        <span className="form-error">{formErrors.lastname} {formErrors.lastname ? 'or': ''} {formErrors.firstname}</span>
                </div>
                <div>
                    <input type="password" value={password} placeholder='password' aria-label='password'
                    onChange={e => setPassword(e.target.value)}/>
                    <span className="form-error">{formErrors?.password}</span>
                </div>
                <button>sign in</button>
            </form>
            <div className="oauth-container">
             <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth/google`}>continue with google</a>
           </div>
           <p>Do you already have an account? <Link to="/accounts/login">log in</Link></p>
        </div>
        <div className="form-img-sign">
        </div>
    </div>
  )
}

export default SignIn