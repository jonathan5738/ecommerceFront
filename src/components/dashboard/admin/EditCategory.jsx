import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { categoryDetail, editCategory, deleteCategory } from '../../../actions/category'
import Modal from '../../../utils/Modal'
import '../../css/Dashboard/EditCategory.css'

function EditCategory() {
  const { category_id } = useParams()
  const dispatch = useDispatch()
  const [showEditForm, setShowEditForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [categoryImage, setCategoryImage] = useState(undefined)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate()
  const category = useSelector(state => state.categories.categories)

  useEffect(() => {
    dispatch(categoryDetail(category_id))
    if(Object.keys(formErrors).length === 0 && isSubmit){
        const data = new FormData()
        data.append('ct_image', categoryImage); data.append('name', name)
        data.append('category_id', category._id)
        dispatch(editCategory(data))
        navigate(`/dashboard/${category_id}/edit`, {replace: true})
    }
  }, [formErrors])

  const handleSubmit = e => {
     e.preventDefault()
     setFormErrors(validate({categoryName: name, categoryImage}))
     setIsSubmit(true)
  }

  const handleCategoryDeletion = () => {
    dispatch(deleteCategory({ category_id: category._id }))
    navigate(`/dashboard`, {replace: true})
  }

   const handleImageUpload = e => {
    setCategoryImage(e.target.files[0])
  }

  const resetField = () => {
     setShowEditForm(prev => !prev)
     setName(category.name)
  }
  const validate = data => {
    const errors = {} 
    if(!data.categoryName) errors.category_name = 'category name required'
    if(!data.categoryImage) errors.category_image = 'category image required'
    return errors
 }
  return (
    <div className='edit-category-container'>
        <div className="category-card">
            {Object.keys(category).includes('name') && (
                <>
                <div className='category-img'>
                      <img src={category?.category_image?.url} alt="" />
                   </div>
                  <div className="category-text">
                        <h4>{category.name}</h4>
                        <div className="category-text-button">
                          <button onClick={resetField}>edit category</button>
                          <button onClick={() => setShowModal(prev => !prev)}>delete category</button>
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className='category-form-container'>
            {showEditForm && (
                <form onSubmit={handleSubmit} className="form">
                  <h3>Edit category</h3>
                    <div className="">
                        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                        <span className="form-error">{formErrors.category_name}</span>
                    </div>
                    <div className="">
                    <input type="file" onChange={handleImageUpload}/>
                    <span className="form-error">{formErrors.category_image}</span>
                    </div>
                    <button>edit category</button>
               </form>
            )}
        </div>
        {showModal && (
            <Modal
               modalTitle={`are you sure, you want to delete ${category.name} category`}
               closeModal={setShowModal}
               actionHandle={handleCategoryDeletion}
            />
        )}
    </div>
  )
}

export default EditCategory