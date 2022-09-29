import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUser } from '../../actions/auth'
function SignIn() {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
        username, first_name: firstName,
        last_name: lastName, email, password
    }
    dispatch(signUser(data))
    navigate('/', { replace: true })
  }

  return (
    <div className='form-section'>
        <div className="form-container signin-container">
            <h3>Sign in </h3>
            <form className='form'  onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} placeholder='username' aria-label='username'
                    onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <input type="email" value={email} placeholder='email' aria-label='email'
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='fullname-container'>
                        <input type="text" value={firstName} placeholder='first name' aria-label='first name'
                            onChange={e => setFirstName(e.target.value)}/>
                        
                        <input type="text" value={lastName} placeholder='last name' aria-label='last name'
                            onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    <input type="password" value={password} placeholder='password' aria-label='password'
                    onChange={e => setPassword(e.target.value)}/>
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