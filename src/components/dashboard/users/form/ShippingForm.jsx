import React, { useState }from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addShipping, editShipping } from '../../../../actions/profile'

function ShippingForm({shippingAddress}) {
  const [zipcode, setZipCode] = useState(shippingAddress?.zipcode || '')
  const [street, setStreet] = useState(shippingAddress?.street || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const [district, setDistrict] = useState(shippingAddress?.district || '')
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
     e.preventDefault()
     let data = {zipcode, street, city, country, district}
     if(shippingAddress){
        dispatch(editShipping({...data, shipping_id: shippingAddress._id}))
     } else {
        dispatch(addShipping(data))
     }
     navigate('/accounts/profile', {replace: true})
  }
  
  return (
    <div>
        <h3>{shippingAddress ? 'edit shipping address': 'add shipping address'}</h3>
        <form  onSubmit={handleSubmit} className="form">
            <div className='input-container'>
                <input type="text" placeholder='zipcode' value={zipcode} className="form-input"
                onChange={e => setZipCode(e.target.value)}
                 aria-label='zipcode' />
             </div>
             <div className='input-container'>
                <input type="text" placeholder='street'  value={street} 
                  onChange={e => setStreet(e.target.value)} aria-label="street" className="form-input"
                />
             </div>
             <div className='input-container'>
                  <input type="text" placeholder='city' value={city}
                    onChange={e => setCity(e.target.value)} aria-label="city" className="form-input"
                   />
             </div>
             <div className='input-container'>
                  <input type="text" placeholder='district' value={district} className="form-input"
                    onChange={e => setDistrict(e.target.value)} aria-label="district"
                   />
             </div>

             <div className='input-container'>
                <input type="text" placeholder='country' value={country} className="form-input"
                  onChange={e => setCountry(e.target.value)} aria-label="country"
                 />
             </div>
             <button>add shipping</button>
        </form>
    </div>
  )
}

export default ShippingForm