import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { fetchProfile } from '../../actions/profile'
import API from '../../api/api'
import '../css/public/Basket.css'

function Basket() {
  let [checkout, setCheckout] = useState()
  const [productQty, setProductQty] = useState()

  if(localStorage.getItem(process.env.REACT_APP_CHECKOUT)){
    checkout = JSON.parse(localStorage.getItem(process.env.REACT_APP_CHECKOUT))
 }
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(fetchProfile())
  }, [])
  const profile = useSelector(state => state.profile)
  
  const removeProduct = (product_id, index=null) => {
    console.log(product_id, index)
    if(index === null){
        delete checkout[product_id]
    } else if (index !== null){
        delete checkout[product_id][index]
        let currentProduct = checkout[product_id].filter(product => product !== null)
        if(currentProduct.length > 1){
            checkout[product_id] = currentProduct
        } else {
            checkout[product_id] = currentProduct[0]
        }
    }
    let data = JSON.stringify(checkout)
    localStorage.setItem(process.env.REACT_APP_CHECKOUT, data)
    setCheckout(checkout)
  }

  const addQuantity = (qty, product_id, index=null) => {
    if(index !== null){
        checkout[product_id][index].qty = parseInt(qty)
    } else if (index === null){
        checkout[product_id].qty = parseInt(qty)
    }
    let data = JSON.stringify(checkout)
    localStorage.setItem(process.env.REACT_APP_CHECKOUT, data)
    setCheckout(checkout)
  }

  const confirmOrder = async () => {
    let products = Object.keys(checkout).map(key => {
        if(checkout[key] instanceof Array){
            let product = {product_id: null, qty: 0, size: [], color: [], product_img: null}
            checkout[key].forEach(p => {
                if(p !== null){
                    product.product_id = p.product_id 
                    product.qty += p.qty 
                    product.size.push(p.size)
                    product.color.push(p.color)
                    product.product_img = p.product_img
                }
            })
            return product
        } 
        return checkout[key]
    })
    const response = await API.post('/products/checkout', {product_ids: products})
    document.location = response.data.url
  }

  return (
      <section className="checkout-container">
         {checkout && (
             <>
                <div className="checkout-product-list">
                    {Object.keys(checkout).map((key, position) => {
                        return(
                           <div key={position}>
                              {checkout[key].length > 0 ? (
                                 <>
                                    {checkout[key].filter(product => product !== null).map((product, index) => {
                                        return(
                                            <div className="checkout-cart-product" key={index}>
                                                <div className="checkout-card-img">
                                                   <img src={product?.product_img} alt="" />
                                                </div>
                                                <div className="checkout-card-text">
                                                    <h2 className='checkout-name'>{product?.name}</h2>
                                                    <p className='checkout-colors'>colors: {product?.color}</p>
                                                    <p className="checkout-size">size: {product?.size}</p>
                                                    <p className='checkout-quantity'>
                                                        quantity: {product?.qty}
                                                        <input type="number" value={productQty} min={1} defaultValue={product?.qty}
                                                        onChange={(e) => addQuantity(e.target.value, product?.product_id, index)}/>
                                                    </p>
                                                    <button onClick={() => removeProduct(product?.product_id, index)}>remove from cart</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                 </>
                              ): (
                                 <div className='checkout-cart-product' key={checkout[key].size}>
                                    <div className="checkout-card-img">
                                        <img src={checkout[key].product_img} alt="" />
                                    </div>
                                    <div className="checkout-card-text">
                                            <h2 className='checkout-name'>{checkout[key].name}</h2>
                                            <p className='checkout-colors'>colors: {checkout[key].color}</p>
                                            <p className="checkout-size">size: {checkout[key].size}</p>
                                            <p className='checkout-quantity'>
                                                quantity: {checkout[key].qty}
                                                <input type="number" value={productQty} min={1} defaultValue={checkout[key].qty}
                                                onChange={(e) => addQuantity(e.target.value, checkout[key].product_id)}/>
                                            </p>
                                            <button onClick={() => removeProduct(checkout[key].product_id)}>remove from cart</button>
                                    </div>
                                 </div>
                              )}
                           </div>
                        )
                    })}
                </div>
                {Object.keys(profile).includes('shippingAddresses') && (
                    <div>
                        <h3>Shipping information</h3>
                        {profile?.shippingAddresses?.filter(shipping => shipping.selectedAddress === true)?.map(shipping => {
                            return (
                                <div className="shipping-card" key={shipping._id}>
                                    <p>Street: {shipping.street}</p>
                                    <p>city: {shipping.city}</p>
                                    <p>district: {shipping.district}</p>
                                    <p>country: {shipping.country}</p>
                                </div>
                            )
                        })}
                        <button onClick={confirmOrder}>Confirm order</button>
                    </div>
                )}
             </>
         )}
         {!checkout && (
             <>
                <div className="checkout-container">
                    <h2>Cart empty</h2>
                </div>
             </>
         )}
      </section>
  )
}

export default Basket