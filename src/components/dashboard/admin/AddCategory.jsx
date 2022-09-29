import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchStore } from '../../../actions/store'
import { createCategory } from '../../../actions/category'
function AddCategory() {
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(undefined)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector(state => state.store)
  useEffect(() => {
    dispatch(fetchStore())
  }, [])
  const handleSubmit = (e) =>{
     e.preventDefault()
    //  const data = {store_id: store._id, name: categoryName}
    const data = new FormData()
    data.append('store_id', store._id); data.append('name', categoryName)
    data.append('category_image', categoryImage)
    dispatch(createCategory(data))
    navigate('/dashboard', {replace: true})
  }
  const handleImageUpload = (e) => {
      setCategoryImage(e.target.files[0])
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder='category name' aria-label='category name'
                 value={categoryName} onChange={e => setCategoryName(e.target.value)}
                 />
            </div>
            <div>
                <input type="file" onChange={handleImageUpload} aria-label='category image'/>
            </div>
            <button>create category</button>
        </form>
    </div>
  )
}

export default AddCategory