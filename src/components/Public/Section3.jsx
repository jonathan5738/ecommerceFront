import React from 'react'
import '../css/public/Section3.css'
function Section3() {
  return (
    <section className="coming-soon">
        <div className="coming-soon-box1">
            <span>BRING FLASHINESS EVEN IN WINTER</span>
            <h2>Our Jewellery collection.</h2>
            <div className="coming-soon-box1-grid">
                 <div></div>
                 <div className='coming-soon-box1-text'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Cumque, nam harum temporibus, incidunt provident nihil
                          voluptatibus voluptatum fugit .</p>
                 </div>
                 <div></div>
                 <div className='coming-soon-box1-img'>
                     <img src="https://images.pexels.com/photos/735276/pexels-photo-735276.jpeg?auto=compress" alt="" />
                 </div>
            </div>
        </div>
        <div className="coming-soon-box2">
            <img src="https://images.pexels.com/photos/13727430/pexels-photo-13727430.jpeg" alt="" />
        </div>
    </section>
  )
}

export default Section3