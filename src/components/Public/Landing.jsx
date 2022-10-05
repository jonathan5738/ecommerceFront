import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../actions/category'
import { logoutUser } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'

import HeroSection from './HeroSection'
import ListCategory from './ListCategory'
import Section3 from './Section3'
import Bannier from './Bannier'
function Landing() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandle = () => {
     dispatch(logoutUser())
     navigate('/', {replace: true})
  }
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  const categories = useSelector(state => state.categories.categories)
  // console.log(categories)
  return (
     <>
        <HeroSection/>
        <ListCategory categories={categories}/>
        <Section3/>
        <Bannier/>
     </>
  )
}

export default Landing