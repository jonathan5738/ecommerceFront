import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../actions/auth'
import {Link} from 'react-router-dom'
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = e => {
     e.preventDefault()
     dispatch(loginUser({username, password}))
     navigate('/', {replace: true})
  }
  return (
    <div className='form-section'>
        <div className="form-container">
            <h3>Log in </h3>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} placeholder='username' aria-label='username'
                    onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <input type="password" value={password} placeholder='password' aria-label='password'
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button>login</button>
            </form>
            <div className="oauth-container">
             <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth/google`}>continue with google</a>
        </div>
        <p>Don't already have an account? <Link to="/accounts/signin">sign in</Link></p>
        </div>
        <div className="form-img"></div>
    </div>
  )
}

export default Login