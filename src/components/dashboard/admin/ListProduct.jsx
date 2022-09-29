import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../actions/product'
import '../../css/Dashboard/ListProduct.css'

function ListProduct() {
  const { category_name } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts(category_name))
  }, [])
  const products = useSelector(state => state.products)
  console.log(products)
  return (
    <div>
        {products && products.length > 0 && (
            <div className="list-product-container">
            {products?.map(product => {
                return (
                   <a href={`/dashboard/${category_name}/products/${product._id}/private/detail`} key={product._id}>
                       <div className="product-card">
                           <div className="product-card-img">
                               <img src={product?.product_imgs[0].url} alt="" />
                           </div>
                           <div className="product-content">
                               <h3>{product.name}</h3>
                               <p>${product.price}</p>
                               <div className="product-link">
                                   
                               </div>
                           </div>
                       </div>
                   </a>
                )
            })}
          </div>
        )}
    </div>
  )
}

export default ListProduct