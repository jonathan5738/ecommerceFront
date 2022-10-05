import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../actions/product'
import '../../css/Dashboard/ListProduct.css'

function ListProduct() {
  const { category_name } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts({category_name, size:false, price: false}))
  }, [])
  const products = useSelector(state => state.products.products)

  return (
    <section className='product-list-container'>
        <div className="fixed-container">
             <div className="filter-list-containter">
              
             </div>
        </div>
        {products && products.length > 0 && (
        <div className="product-card-container">
            {products?.map(product => {
                return (
                   <a href={`/dashboard/${category_name}/products/${product._id}/private/detail`} key={product._id}>
                       <div className="product-card">
                           <div className="product-card-img">
                               <img src={product?.product_imgs[0].url} alt="" />
                           </div>
                           <div className="product-card-text">
                               <h3 className='product-name'>{product.name}</h3>
                               <div className="product-card-text-detail">
                                  <div className="price-content">
                                      <h4 className='price-label'>Price:</h4>
                                      <span className="product-price">{product.price}</span>
                                  </div>
                               </div>
                               
                           </div>
                       </div>
                   </a>
                )
            })}
          </div>
        )}
    </section>
  )
}

export default ListProduct