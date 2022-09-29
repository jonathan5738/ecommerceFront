import React, {useState} from 'react'

function EditPasswordForm() {
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConformPass] = useState()
    const handleSubmit = (e) => {
       e.preventDefault()
    }
    return (
      <>
        <h3 className="form-title">Change your password</h3>
          <form onSubmit={handleSubmit} className="form">
              <div className='input-container'>
                  <input type="password" placeholder='previous password' value={oldPass} className="form-input"
                  onChange={(e) => setOldPass(e.target.value)}
                   aria-label='previous password' />
              </div>
              <div className='input-container'> 
                  <input type="password" placeholder='new password' value={newPass} className="form-input"
                  onChange={(e) => setNewPass(e.target.value)}
                   />
              </div>
              <div className='input-container'>
                  <input type="password" placeholder='confirm password' className="form-input"
                  onChange={(e) => setConformPass(e.target.value)}
                  value={confirmPass} />
              </div>
              <button className='form-button'>change password</button>
          </form>
      </>
    )
}

export default EditPasswordForm