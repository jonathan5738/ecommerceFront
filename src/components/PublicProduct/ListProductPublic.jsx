import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../actions/product'
import { FiShoppingCart, FiFilter } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchCategories } from '../../actions/category'

import '../css/public/ListProductPublic.css'
import FilterForm from './FilterForm'
function ListProductPublic() { 
  const { category_name } = useParams()
  const [searchParams, setSearchParams] = useSearchParams({price: null, size: null})
  const [showFilter, setShowFilter] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [sizeS, setSizeS] = useState(false)
  const [sizeM, setSizeM] = useState(false)
  const [sizeXS, setSizeXS] = useState(false)
  const [sizeL, setSizeL] = useState(false)
  const [sizeXL, setSizeXL] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.products.products)
  const categories = useSelector(state => state.categories.categories)

  useEffect(() => {
    let size = searchParams.get('size') !== 'null' ? JSON.parse(searchParams.get('size')) : false;
    let price = searchParams.get('price') !== 'null' ? String(searchParams.get('price')): false
    dispatch(fetchCategories())
    dispatch(fetchProducts({category_name, price, size}))
  }, [])

  const variants = {
   hidden: {opacity: 0},
   visible: {opacity: 1}
  }

  const handleSubmit = e => {
    e.preventDefault()
    const selectedSizes = {M: sizeM, XL:sizeXL, XS: sizeXS, L :sizeL, S: sizeS}
   dispatch(fetchProducts({category_name, size: selectedSizes, price: selectedPrice}))
   if(parseInt(selectedPrice) === 0){
      setSearchParams({size: JSON.stringify(selectedSizes)})
   } else if(parseInt(selectedPrice) > 0){
      setSearchParams({price: selectedPrice, size: JSON.stringify(selectedSizes)})
   }
      let size = searchParams.get('size') !== 'null' ? JSON.parse(searchParams.get('size')) : false;
      let price = searchParams.get('price') !== 'null' ? String(searchParams.get('price')): false
      dispatch(fetchProducts({category_name, price, size}))
  }

  const resetUrl = () => {
     setSearchParams({price: null, size: null})
     window.location.assign(`/products/${category_name}/all`)
  }
  
  
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
            <FilterForm 
               sizeL={sizeL}
               sizeM={sizeM}
               sizeXL={sizeXL}
               sizeXS={sizeXS}
               sizeS={sizeS}

               setSizeL={setSizeL}
               setSizeM={setSizeM}
               setSizeXL={setSizeXL}
               setSizeXS={setSizeXS}
               setSizeS={setSizeS}
               handleSubmit={handleSubmit}
               selectedPrice={selectedPrice}
               setSelectedPrice={setSelectedPrice}
               resetUrl={resetUrl}
            />
            </div>
       </div>
       <div className="product-section">
          <div className='product-section-text'>
             <h3>{category_name} collection</h3>
             <button className='filter-button' onClick={() => setShowFilter(prev => !prev)}>filter<FiFilter/></button>
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
       </div>
       <div className="mobile-filter-container">
       <motion.div className="mobile-filter" 
          variants={variants}
          initial='hidden'
          animate={showFilter ? 'visible': ''}
       >
           <FilterForm 
               sizeL={sizeL}
               sizeM={sizeM}
               sizeXL={sizeXL}
               sizeXS={sizeXS}
               sizeS={sizeS}

               setSizeL={setSizeL}
               setSizeM={setSizeM}
               setSizeXL={setSizeXL}
               setSizeXS={setSizeXS}
               setSizeS={setSizeS}
               handleSubmit={handleSubmit}
               selectedPrice={selectedPrice}
               setSelectedPrice={setSelectedPrice}
               resetUrl={resetUrl}
            />
       </motion.div>
       </div>
    </section>
  )
}

export default ListProductPublic