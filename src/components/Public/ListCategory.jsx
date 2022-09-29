import React from 'react'
import '../css/public/ListCategory.css'
import { Link } from 'react-router-dom'
function ListCategory({categories}) {
  return (
    <section className="category-container">
         <h3>Our category</h3>
         <div className="list-category">
            {categories.length > 0 && (
               <>
                  {categories?.map(category => {
                     return (
                     <Link to={`/products/${category.name}/all`} key={category._id}>
                        <div className="category-card">
                           <div className="category-img">
                              <img src={category.category_image.url} alt="" />
                           </div>
                        </div>
                     </Link>
                     )
                  })}
               </>
            )}
         </div>
    </section>
  )
}

export default ListCategory