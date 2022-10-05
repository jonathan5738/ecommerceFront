import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import '../css/public/ListCategory.css'

function ListCategory({categories}) {
  return (
    <section className="category-container">
         <h3>Our category</h3>
         <div>
            {categories.length > 0 && (
               <Swiper className="list-category"
                  modules={[Navigation, Pagination, A11y]}
                  breakpoints={{ 714: {slidesPerView: 3}}}
                  spaceBetween={50}
                  slidesPerView={1}
                  pagination={true}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
               >
                  {categories?.map(category => {
                     return (
                       <SwiperSlide key={category._id}>
                           <Link to={`/products/${category.name}/all`}>
                              <div className="category-card">
                                 <div className="category-img">
                                    <img src={category.category_image.url} alt="" />
                                 </div>
                              </div>
                           </Link>
                       </SwiperSlide>
                     )
                  })}
               </Swiper>
            )}
         </div>
    </section>
  )
}

export default ListCategory