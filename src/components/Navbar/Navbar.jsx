import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../actions/auth'
import { FiMenu, FiShoppingCart, FiX, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import '../css/Navbar/Navbar.css'

function Navbar() {
 const [showMenu, setShowMenu] = useState(false)
 const dispatch = useDispatch()
 const variant = {
    hidden: {opacity: 1, scale: 0.4, x: '-100%'},
    visible: {opacity: 1, scale: 1, x: 0}
 }
 let currentUser;
 if (localStorage.getItem('profile')){
    currentUser = JSON.parse(localStorage.getItem('profile'))
 }
 const containerDiv = useRef()


  return (
     <div>
        <section className="navbar-container" ref={containerDiv}>
         <nav className="navbar">
             <ul className='menu'>
                 <FiMenu size={20} color={'#fff'} className='menu-icon2' onClick={() => setShowMenu(true)}/>
                 <li>
                    <a href="/products/hats/all" className='menu-item'>products</a>
                </li>
                 <li><Link to="#" className='menu-item'>our story</Link></li>
                 <li><Link to="#" className='menu-item'>contact us</Link></li>
             </ul>
             <a href="/" className='main-logo'>Vestimentas</a>
             <div className='menu-section2'>
                <form action="">
                     <input type="text" className="product-search" placeholder='search...'/>
                </form>
                {/* <FiMenu size={20} color={'#fff'} className='menu-icon'/> */}
                <Link to="/cart"><FiShoppingCart size={20} color={'#fff'} className='shopping-cart'/></Link>
                <div className="authentication-links">
                    {currentUser && (<Link to="#" onClick={() => dispatch(logoutUser())}>logout</Link>)}
                    {!currentUser && (
                      <Link to="/accounts/login" className='desk-login'>login</Link>
                    )}
                </div>
             </div>
         </nav>
     </section>
     <motion.section className="mobile-menu"
       variants={variant}
       initial='hidden'
       animate={showMenu ? 'visible': ''}
       transition={{ duration: .3 }}
     >
        <motion.div className="menu-content">
           <a href="/" className='main-logo-mobile'>Vestimentas</a>
           <form>
                <input type="text" className="menu-content-product-search" placeholder='search...'/>
            </form>
            <ul className='menu-mobile'>
                 <li><span>products</span><Link to="#" className='menu-item-mobile'> <FiChevronRight/></Link></li>
                 <li><span>our story</span><Link to="#" className='menu-item-mobile'> <FiChevronRight/></Link></li>
                 <li><span>contact us</span><Link to="#" className='menu-item-mobile'> <FiChevronRight/></Link></li>
             </ul>
             <FiX className='close-menu' size={27} color={"#6e6e6e"} onClick={() => setShowMenu(prev => !prev)}/>
             {!currentUser && (
                <Link className='mobile-login' onClick={() => setShowMenu(prev => !prev)} to="/accounts/login">login</Link>
             )}
        </motion.div>
     </motion.section>
     </div>
  )
}

export default Navbar