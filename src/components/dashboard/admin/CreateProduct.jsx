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

  useEffect(() => {
    dispatch(fetchStore())
  },[])
  const store = useSelector(state => state.store)
  const handleSubmit = (e) => {
     e.preventDefault()
     const data = new FormData()
    tags = tags.split('#'); colors = colors.split('#')
    data.append('product_imgs', product_imgs); data.append('categoryName', category_name)
    data.append('name', name); data.append('description', description); data.append('price', price)
    data.append('qty_size', qty_size); data.append('colors', colors); data.append('tags', tags)
    data.append('shop', store._id); data.append('qty', qty)
    dispatch(createProduct(data))
    navigate(`/dashboard/${category_name}/manage`, { replace: true })
  }
  const handleImageUpload = (e) => {
      setProductImgs(e.target.files[0])
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="name" aria-label='name'
                />
            </div>
            <div>
                <input type="text" value={colors} onChange={e => setColors(e.target.value)}
                  placeholder="colors" aria-label='colors'
                />
                <input type="text" value={tags} onChange={e => setTags(e.target.value)}
                   placeholder="tags" aria-label='tags'
                 />
            </div>

            <div>
                <textarea value={description} cols="30" rows="6" 
                   onChange={e => setDescription(e.target.value)} placeholder="description"
                   aria-label='description'
                ></textarea>
            </div>

            <div>
                <input type="text" value={qty} onChange={e => setQty(e.target.value)} 
                   placeholder="quantity" aria-label='quantity'
                 />
                 <input type="text" value={price} onChange={e => setPrice(e.target.value)} 
                    placeholder="price" aria-label='price'
                 />
            </div>
            <div>
                <input type="file" onChange={handleImageUpload} />
            </div>

            <div>
                <textarea value={qty_size} onChange={e => setQtySize(e.target.value)} cols="30" rows="5"></textarea>
            </div>
            <button>create product</button>
        </form>
    </div>
  )
}

export default CreateProduct