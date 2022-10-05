import React, {useState, useEffect} from 'react'

function EditPasswordForm() {
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConformPass] = useState()
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            // submit user data here 
        }
    }, [formErrors])

    const handleSubmit = (e) => {
       e.preventDefault()
       setFormErrors(validate({oldPass, newPass, confirmPass}))
       setIsSubmit(true)
    }
    const validate = data => {
        const errors = {}
        if(!data.oldPass) errors.oldPassword = 'old password required'
        if(!data.newPass) errors.oldPassword = 'new password required'
        if(!data.confirmPass) errors.oldPassword = 'repeat password required'

        if(data.newPass.length < 5){
            errors.newPass = 'passsword must be at least 5 characters long'
         }
         if(data.confirmPass.length < 5){
            errors.confirmPass = 'passsword must be at least 5 characters long'
         }
         const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ 
         if(!specialChars.test(data.newPass)) {
            errors.newPass = 'password must contains at least special characters'
         }
         if(!specialChars.test(data.confirmPass)) {
            errors.confirmPass = 'password must contains at least special characters'
         }
        if(data.newPass !== data.confirmPass){
            errors.newPass = 'both password must match'
            errors.confirmPass = 'both password must match'
        }
        return errors 
    }
    return (
      <>
        <h3 className="form-title">Change your password</h3>
          <form onSubmit={handleSubmit} className="form">
              <div className='input-container'>
                  <input type="password" placeholder='previous password' value={oldPass} className="form-input"
                  onChange={(e) => setOldPass(e.target.value)}
                   aria-label='previous password' />
                   <span className="form-error">{formErrors?.oldPassword}</span>
              </div>
              <div className='input-container'> 
                  <input type="password" placeholder='new password' value={newPass} className="form-input"
                  onChange={(e) => setNewPass(e.target.value)}
                   />
                   <span className="form-error">{formErrors?.newPassword}</span>
              </div>
              <div className='input-container'>
                  <input type="password" placeholder='confirm password' className="form-input"
                  onChange={(e) => setConformPass(e.target.value)}
                  value={confirmPass} />
                  <span className="form-error">{formErrors?.confirmPassword}</span>
              </div>
              <button className='form-button'>change password</button>
          </form>
      </>
    )
}

export default EditPasswordForm