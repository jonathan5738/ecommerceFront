import React, { useState, useEffect }from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addShipping, editShipping } from '../../../../actions/profile'


function ShippingForm({shippingAddress}) {
  const [zipcode, setZipCode] = useState(shippingAddress?.zipcode || '')
  const [street, setStreet] = useState(shippingAddress?.street || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const [district, setDistrict] = useState(shippingAddress?.district || '')
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  
  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
      let data = {zipcode, street, city, country, district}
      if(shippingAddress){
            dispatch(editShipping({...data, shipping_id: shippingAddress._id}))
      } else {
            dispatch(addShipping(data))
      }
      navigate('/accounts/profile', {replace: true})
    }
  }, [formErrors])
  const handleSubmit = (e) => {
     e.preventDefault()
     let data = {zipcode, street, city, country, district}
     setFormErrors(validate(data))
     setIsSubmit(true)
  }
  const validate = data => {
     const errors = {} 
     if(!data.zipcode) errors.zipcode = 'zipcode required' 
     if(!data.street) errors.street = 'street required'
     if(!data.city) errors.city = 'city required'
     if(!data.country) errors.country = 'country required'
     if(!data.district) errors.district = 'district required'
     return errors
  }
  return (
    <div>
        <h3>{shippingAddress ? 'edit shipping address': 'add shipping address'}</h3>
        <form  onSubmit={handleSubmit} className="form">
            <div className='input-container'>
                <input type="text" placeholder='zipcode' value={zipcode} className="form-input"
                onChange={e => setZipCode(e.target.value)}
                 aria-label='zipcode' />
                 <span className='form-error'>{formErrors?.zipcode}</span>
             </div>
             <div className='input-container'>
                <input type="text" placeholder='street'  value={street} 
                  onChange={e => setStreet(e.target.value)} aria-label="street" className="form-input"
                />
                <span className='form-error'>{formErrors?.street}</span>
             </div>
             <div className='input-container'>
                  <input type="text" placeholder='city' value={city}
                    onChange={e => setCity(e.target.value)} aria-label="city" className="form-input"
                   />
                   <span className='form-error'>{formErrors?.city}</span>
             </div>
             <div className='input-container'>
                  <input type="text" placeholder='district' value={district} className="form-input"
                    onChange={e => setDistrict(e.target.value)} aria-label="district"
                   />
                   <span className='form-error'>{formErrors?.district}</span>
             </div>

             <div className='input-container'>
                <input type="text" placeholder='country' value={country} className="form-input"
                  onChange={e => setCountry(e.target.value)} aria-label="country"
                 />
                 <span className='form-error'>{formErrors?.country}</span>
             </div>
             <button>add shipping</button>
        </form>
    </div>
  )
}

export default ShippingForm