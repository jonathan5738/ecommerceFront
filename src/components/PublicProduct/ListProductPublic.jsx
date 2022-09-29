import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../../actions/product'
import { FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../actions/category'

import '../css/public/ListProductPublic.css'
function ListProductPublic() { 
  const { category_name } = useParams()
  const [selectedPrice, setSelectedPrice] = useState(2)
  const [sizeM, setSizeM] = useState(false)
  const [sizeXS, setSizeXS] = useState(false)
  const [sizeL, setSizeL] = useState(false)
  const [sizeXL, setSizeXL] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts(category_name))
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    const selectedSizes = {sizeM, sizeXL, sizeXS, sizeL}
    console.log(selectedSizes, selectedPrice)
  }
  const products = useSelector(state => state.products.products)
  const categories = useSelector(state => state.categories.categories)
  
  return (
    <section className="product-list-container">
       <div className="fixed-container">
            <div className="filter-list-containter">
               <div className="categories-div">
                     <h3>Categories</h3>
                     {categories.length > 0 && (
                           <ul className='category-list'>
                              {categories?.map(category => {
                                 return (
                                    <li key={category._id}><a href={`/products/${category.name}/all`}>{category.name}</a></li>
                                 )
                              })}
                        </ul>
                     )}
               </div>
               <div className="filter-div">
                  <h3>Filters</h3>
                     <form onSubmit={handleSubmit}>
                        <div className="sizes">
                           <h3>Filter by size</h3>
                              <div className="sizes-container">
                                 <span>
                                    <label htmlFor="XS">XS</label>
                                    <input type="checkbox" value={sizeXS} name="size" id="XS" onChange={e => setSizeXS(true)} />
                                 </span> 
                                 <span>
                                    <label htmlFor="M">M</label>
                                    <input type="checkbox" value={sizeM}  onChange={e => setSizeM(true)} name="size" id="M" />
                                 </span> 
                                 <span>
                                    <label htmlFor="L">L</label>
                                    <input type="checkbox" value={sizeL} name="size" onChange={e => setSizeL(true)} id="L" />
                                 </span> 
                                 <span>
                                    <label htmlFor="XL">XL</label>
                                    <input type="checkbox" name="size" value={sizeXL} id="XL" onChange={e => setSizeXL(true)} />
                                 </span> 
                              </div>
                        </div>
                        <div className="price">
                            <h3>Filter by price</h3>
                            <div className="price-range-container">
                                 <input type="range"  value={selectedPrice} id="selected-price" min="2" max="500" onChange={(e) => setSelectedPrice(e.target.value)}/>
                                 <label htmlFor="selected-price">${selectedPrice}</label>
                            </div>
                        </div>
                        <button className='filter-button'>apply filter</button>
                     </form>
               </div>
            </div>
       </div>
       <div className="product-card-container">
           {products.length > 0 && (
              <>
                 {products?.map(product => {
                    return (
                        <a href={`/products/${product.slug}`} key={product._id}>
                          <div className="product-card">
                              <div className="product-card-img">
                                <img src={product?.product_imgs[0]?.url} alt="" />
                              </div>
                              <div className="product-card-text">
                                  <h3 className='product-name'>{product.name}</h3>
                                  <div className="product-card-text-detail">
                                       <div className='price-content'>
                                          <h4 className='price-label'>Price:</h4>
                                          <span className="product-price">{product.price}</span>
                                       </div>
                                  </div>
                              </div>
                          </div>
                        </a>
                    )
                 })}
              </>
           )}
       </div>
    </section>
  )
}

export default ListProductPublic