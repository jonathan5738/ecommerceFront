import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Public/Landing'
import Login from './components/accounts/Login'
import SignIn from './components/accounts/SignIn'

import Dashboard from './components/dashboard/admin/Dashboard'
import ManageProduct from './components/dashboard/admin/ManageProduct'
import ListProduct from './components/dashboard/admin/ListProduct'
import ProductDetailPrivate from './components/dashboard/admin/ProductDetailPrivate'
import CreateProduct from './components/dashboard/admin/CreateProduct'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AdminRoutes from './utils/AdminRoutes'


import AddCategory from './components/dashboard/admin/AddCategory'
import ListProductPublic from './components/PublicProduct/ListProductPublic'
import Page403 from './components/Errors/Page403'
import Page404 from './components/Errors/Page404'

import Navbar from './components/Navbar/Navbar'

import EditCategory from './components/dashboard/admin/EditCategory'
import ProductDetailPublic from './components/PublicProduct/ProductDetailPublic'
import Basket from './components/Public/Basket'
import UserProfile from './components/dashboard/users/UserProfile'
import OrderList from './components/dashboard/users/OrderList'

import './components/css/generale.css'
import './components/css/variables.css'
import Success from './components/paymentPages/Success'
import Cancel from './components/paymentPages/Cancel'

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
     <BrowserRouter>
        <Navbar/>
         <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/success" element={<Success/>}/> 
              <Route path="/cancel" element={<Cancel/>}/>
              <Route path="/accounts/login" element={<Login/>}/> 
              <Route path="/accounts/signin" element={<SignIn/>}/>
              <Route path="/products/:category_name/all" element={<ListProductPublic/>}/>
              <Route path="/products/:product_slug" element={<ProductDetailPublic/>}/>
              <Route path="/error/403" element={<Page403/>}/> 
              <Route path="/error/404" element={<Page404/>}/>
              <Route element={<ProtectedRoutes/>}>
                 <Route path="/accounts/profile" element={<UserProfile/>}/>
                 <Route path="/accounts/orders" element={<OrderList/>}/>
                 <Route path="/cart" element={<Basket/>}/>
                 
                  <Route element={<AdminRoutes/>}>
                      <Route path="/dashboard" element={<Dashboard/>}/>
                      <Route path="/dashboard/category/add" element={<AddCategory/>}/>
                      <Route path="/dashboard/:category_id/edit" element={<EditCategory/>}/>
                      <Route path="/dashboard/:category_name/manage" element={<ManageProduct/>}/>
                      <Route path="/dashboard/:category_name/manage/products/add" element={<CreateProduct/>}/>
                      <Route path="/dashboard/:category_name/manage/products/all" element={<ListProduct/>}/>
                      <Route path="/dashboard/:category_name/products/:product_id/private/detail" element={<ProductDetailPrivate/>}/>
                  </Route>
              </Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App