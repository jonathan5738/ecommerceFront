import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../../../actions/auth'
function EditUserForm() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))
  const [username, setUsername] = useState(currentUser.username || '')
  const [email, setEmail] = useState(currentUser.email || '')
  const [firstName, setFirstName] = useState(currentUser.first_name || '')
  const [lastName, setLastName] = useState(currentUser.last_name || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
     e.preventDefault()
     const data = {username, email, first_name: firstName, last_name: lastName}
     dispatch(editUser(data))
     navigate('/accounts/profile', {replace: true})
  }
  return (
    <>
        <h3 className="form-title">Edit your personal info</h3>
        <form action="" onSubmit={handleSubmit} className="form">
             <div className='input-container'> 
               <label htmlFor="username">username*</label>
                <input type="text" placeholder='username' id='username' value={username} className="form-input"
                onChange={e => setUsername(e.target.value)}
                 aria-label='username' />
             </div>

             <div className='input-container'>
             <label htmlFor="email">email*</label>
                <input type="text" placeholder='email' id='email' value={email} className="form-input"
                onChange={e => setEmail(e.target.value)}
                 aria-label='email' />
             </div>

             <div className='input-container'>
             <label htmlFor="first_name">first name*</label>
                <input type="text" placeholder='first name' id='first_name' value={firstName} className="form-input"
                onChange={e => setFirstName(e.target.value)}
                 aria-label='first name' />
             </div>

             <div className='input-container'>
             <label htmlFor="last_name">last name*</label>
                <input type="text" placeholder='last name' id='last_name' value={lastName} className="form-input"
                onChange={e => setLastName(e.target.value)}
                 aria-label='last name' />
             </div>
             <button className='form-button'>edit user</button>
        </form>
    </>
  )
}

export default EditUserForm