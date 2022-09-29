import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile, setCurrentShipping } from '../../../actions/profile'
import EditPasswordForm from './form/EditPasswordForm'
import EditUserForm from './form/EditUserForm'
import ShippingForm from './form/ShippingForm'

import '../../css/Dashboard/UserProfile.css'

function UserProfile() {
  let currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))
  const dispatch = useDispatch()
  const [showPassForm, setShowPassForm] = useState(false)
  const [showEditUserForm, setEditUserForm] = useState(false)
  const [showShippingform, setShippingForm] = useState(false)
  const [shippingAddress, setShippingAddress] = useState()

  useEffect(() => {
    dispatch(fetchProfile())
  }, [])

  const profile = useSelector(state => state.profile)
  
  const showEditFormHandler = () => {
      setEditUserForm(true);setShippingForm(false)
      setShowPassForm(false)
  }
  const showPasswordFormHandler = () => {
      setEditUserForm(false); setShippingForm(false)
      setShowPassForm(true)
  }
  const shippgingHandler = () => {
     setEditUserForm(false); setShowPassForm(false); 
     setShippingForm(true)
  }

  const handleEditShipping = (shippingAddress) => {
      setShippingAddress(shippingAddress)
      setEditUserForm(false); setShowPassForm(false)
      setShippingForm(true);
  }
  const setDefaultShippingAddress = (shipping_id) => {
     dispatch(setCurrentShipping({shipping_id}))
  }
  return (
    <section className="user-profile-container">
        <div className="user-profile-content">
            {Object.keys(profile).includes('shippingAddresses') && (
               <>
                 <h2 className='shipping-title'>Shipping Addresses</h2>
                  {profile.shippingAddresses.length > 0 && (
                     <div>
                        {profile.shippingAddresses.map(shipping => {
                           return (
                              <div className={`shipping-address-card ${shipping.selectedAddress ? 'selected-address': ''}`} key={shipping._id}>
                                 <h3>{currentUser.first_name} {currentUser.last_name}</h3>
                                 <p>{shipping.street}, {shipping.zipcode}</p>
                                 <p>{shipping.city}, {shipping.country}</p>
                                 <button onClick={() => handleEditShipping(shipping)}>edit</button>
                                 {!shipping.selectedAddress && (
                                     <button onClick={() => setDefaultShippingAddress(shipping._id)}>select as default</button>
                                 )}
                              </div>
                           )
                        })}
                     </div>
                  )}
                  <div className="user-buttons">
                        {currentUser && (
                           <button onClick={shippgingHandler}
                           className='btn btn-shipping'>add shipping address</button>
                           
                        )}
                        {!profile.oauth && (
                           <>
                              <button onClick={showEditFormHandler} className="btn edit-user">edit user profile</button>
                              <button onClick={showPasswordFormHandler} className='btn change-password'>change password</button>
                           </>
                        )}
                  </div>
               </>
            )}
        </div>
        <div className="user-profile-form">
           {showEditUserForm && !showPassForm && (
               <EditUserForm/>
           )}
           {showPassForm && !showEditUserForm && (
              <EditPasswordForm/>
           )}
           {showShippingform && (
              <ShippingForm
                 shippingAddress={shippingAddress ? shippingAddress: null}
              />
           )}
        </div>
    </section>
  )
}

export default UserProfile