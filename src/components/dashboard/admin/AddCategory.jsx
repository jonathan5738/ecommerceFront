import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchStore } from '../../../actions/store'
import { createCategory } from '../../../actions/category'

function AddCategory() {
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(undefined)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector(state => state.store)

  useEffect(() => {
    dispatch(fetchStore())
    if(Object.keys(formErrors).length === 0 && isSubmit){
      const data = new FormData()
      data.append('store_id', store._id); data.append('name', categoryName)
      data.append('category_image', categoryImage)
      dispatch(createCategory(data))
      navigate('/dashboard', {replace: true})
    }
  }, [formErrors])

  const handleSubmit = (e) =>{
     e.preventDefault()
    setFormErrors(validate({categoryImage, categoryName}))
    setIsSubmit(true)
  }
  const handleImageUpload = (e) => {
      setCategoryImage(e.target.files[0])
  }
  const validate = data => {
     const errors = {} 
     if(!data.categoryName) errors.category_name = 'category name required'
     if(!data.categoryImage) errors.category_image = 'category image required'
     return errors
  }
  return (
    <div className='form-section'>
        <div className="form-container">
          <form className='form' onSubmit={handleSubmit}>
              <div>
                  <input type="text" placeholder='category name' aria-label='category name'
                  value={categoryName} onChange={e => setCategoryName(e.target.value)}
                  />
                  <span className="form-error">{formErrors.category_name}</span>
              </div>
              <div>
                  <input type="file" onChange={handleImageUpload} aria-label='category image'/>
                  <span className="form-error">{formErrors.category_image}</span>
              </div>
              <button>create category</button>
          </form>
        </div>
    </div>
  )
}

export default AddCategory