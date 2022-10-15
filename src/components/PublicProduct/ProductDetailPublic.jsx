import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductPublic} from '../../actions/product'

import '../css/public/ProductDetailPublic.css'

function ProductDetailPublic() {
  const { product_slug } = useParams()
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(fetchProductPublic(product_slug))
  }, [])

  const product = useSelector(state => state.products.products)
//   const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))

  const handleSubmit = (e) => {
     e.preventDefault()
     let checkout;
     let product_data = {}
     if(localStorage.getItem(process.env.REACT_APP_CHECKOUT)){

        checkout = JSON.parse(localStorage.getItem(process.env.REACT_APP_CHECKOUT))
        if(!(checkout[product._id] instanceof Array) &&
          checkout[product._id] && checkout[product._id].size === size && checkout[product._id].color === color){
            // if a product arealdy exist in the checkout with same options, the quantity get updated
            const searchProduct = checkout[product._id]
            searchProduct.qty = parseInt(qty) + parseInt(searchProduct.qty)
            checkout[product._id] = searchProduct
        } else if (checkout[product._id] instanceof Array){
            // when the same product have multiple options and one option get quantity updated
           checkout[product._id] = checkout[product._id].map(p => {
                if(p.size === size && p.color === color) p.qty = parseInt(p.qty) + parseInt(qty)
                return p
            })
        } else {
            if(Object.keys(checkout).includes(product._id)){
                // the same product is added but with different options (size or color)
                checkout[product._id] = [checkout[product._id], {product_id: product._id, color, qty, size, name: product.name,
                     product_img: product.product_imgs[0].url}]
            } else {
                // a new product is added to a checkout
                // const key = jwt.sign({userId: currentUser.id, productId: product._id}, 'akdaskjdasdsa')
                checkout[product._id] = {product_id: product._id, color, qty, size, name: product.name,
                     product_img: product.product_imgs[0].url}
            }
        }
        localStorage.setItem(process.env.REACT_APP_CHECKOUT, JSON.stringify(checkout))
     } else {
        // checkout is empty and first product is added
        product_data[product._id] = {product_id: product._id, color, qty, size, product_img: product.product_imgs[0].url, name: product.name}
        let data = JSON.stringify(product_data)
        localStorage.setItem(process.env.REACT_APP_CHECKOUT, data)
     }
  }
  return (
    <section className="product-detail-container">
        {Object.keys(product).includes('description') && (
             <>  
                <div className="product-detail-img">
                    <img src={product?.product_imgs[0]?.url} alt="" />
                </div>
                <div className="product-detail-text">
                    <h2 className='product-name'>{product.name}</h2>
                    <p className='product-description'>{product.description}</p>
                    <p className="product-price"><span className="dollar-sign">$</span>{product.price}</p>
                    <div className="product-form-options">
                        <form onSubmit={handleSubmit}>
                            <select name="colors" id="" className='product-colors' required>
                                <option value="#">Select color</option>
                                {product?.colors.map(color => {
                                    return (<option onClick={() => setColor(color)} key={color} value={color}>{color}</option>)
                                })}
                            </select>
                            
                            <select name="size" id="" className='product-size' required>
                                <option value="#">Select size</option>
                                {product?.qty_size?.filter(sizeOptions => sizeOptions.sizeQty > 0).map(sizeOption => {
                                    return (
                                        <option onClick={() => setSize(sizeOption.size)} 
                                        key={sizeOption.size} value={sizeOption.size}>{sizeOption.size}</option> 
                                    )
                                })}
                            </select>
                            <input type="number" className='product-qty' onChange={e => setQty(e.target.value)}
                             min={qty} max={product?.qty} defaultValue="1"  required/>
                            <button className='cart'>Add to cart</button>
                        </form>
                    </div>
                </div>
             </>
        )}
    </section>
  )
}

export default ProductDetailPublic