import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { createProduct } from '../../../actions/product'
import { fetchStore } from '../../../actions/store'

function CreateProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { category_name } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [product_imgs, setProductImgs] = useState(undefined)
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [qty_size, setQtySize] = useState()
  let [colors, setColors] = useState('')
  let [tags, setTags] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const store = useSelector(state => state.store.data) 
  
  useEffect(() => {
    dispatch(fetchStore())
    if(Object.keys(formErrors).length === 0 && isSubmit){
      const data = new FormData()
      tags = tags.split('#'); colors = colors.split('#')
      data.append('product_imgs', product_imgs); data.append('categoryName', category_name)
      data.append('name', name); data.append('description', description); data.append('price', price)
      data.append('qty_size', qty_size); data.append('colors', colors); data.append('tags', tags)
      data.append('shop', store._id); data.append('qty', qty)
      dispatch(createProduct(data))
      navigate(`/dashboard/${category_name}/manage`, { replace: true })
    }
  },[formErrors])

  const handleSubmit = (e) => {
     e.preventDefault()
     setFormErrors(validate({name, description, qty, qty_size, product_imgs, price, colors, tags}))
     setIsSubmit(true)
  }
  const handleImageUpload = (e) => {
      setProductImgs(e.target.files[0])
  }
  const validate = data => {
     const errors = {}
     if(!data.name) errors.name = 'name required'
     if(!data.description) errors.description = 'description required'
     if(!data.qty) errors.qty = 'quantity required'
     if(parseInt(data.qty) < 0) errors.qty = 'quantity must be greater than 0'
     if(!data.qty_size)  errors.qty_size = 'qty_size required'
     if(!data.product_imgs) errors.product_imgs = 'product_imgs required'
     if(!data.price) errors.price = 'price required'
     if(parseFloat(data.price) < 0) errors.price = 'price must be greater than 0.00'
     if(!data.colors) errors.colors = 'colors required'
     if(!data.tags) errors.tags = 'tags required'
     return errors
  }
  return (
    <div className='form-section'>
        <div className="form-container">
          <h3>Add new product*</h3>
          <form className='form' onSubmit={handleSubmit}>
              <div>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="name" aria-label='name'
                  />
                  <span className="form-error">{formErrors.name}</span>
              </div>
              <div>
                 <div className='multiple-field'>
                     <input type="text" value={colors} onChange={e => setColors(e.target.value)}
                        placeholder="colors" aria-label='colors'
                      />
                      <input type="text" value={tags} onChange={e => setTags(e.target.value)}
                        placeholder="tags" aria-label='tags'
                      />
                 </div>
                 <span className="form-error">{formErrors.colors} {formErrors.colors || formErrors.tags ? 'or': ''} {formErrors.tags}</span>
              </div>

              <div>
                  <textarea value={description} cols="30" rows="6" 
                    onChange={e => setDescription(e.target.value)} placeholder="description"
                    aria-label='description'
                  ></textarea>
                  <span className="form-error">{formErrors.description}</span>
              </div>

              <div>
                  <div className='multiple-field'>
                    <input type="text" value={qty} onChange={e => setQty(e.target.value)} 
                      placeholder="quantity" aria-label='quantity'
                    />
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} 
                        placeholder="price" aria-label='price'
                    />
                  </div>
                  <span className="form-error">{formErrors.price} {formErrors.price || formErrors.qty ? 'or': ''} {formErrors.qty}</span>
              </div>
              <div>
                  <input type="file" onChange={handleImageUpload} />
                  <span className="form-error">{formErrors.product_imgs}</span>
              </div>

              <div>
                  <textarea value={qty_size} onChange={e => setQtySize(e.target.value)} cols="30" rows="5"></textarea>
                  <span className="form-error">{formErrors.qty_size}</span>
              </div>
              <button>create product</button>
          </form>
        </div>
    </div>
  )
}

export default CreateProduct