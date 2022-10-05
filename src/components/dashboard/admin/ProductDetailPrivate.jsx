import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductPrivateDetail, editProduct, deleteProduct  } from '../../../actions/product'
import Modal from '../../../utils/Modal'
import '../../css/Dashboard/ProductDetailPrivate.css'

function ProductDetailPrivate() {
  const { product_id, category_name } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [product_imgs, setProductImgs] = useState(undefined)
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [qty_size, setQtySize] = useState()
  let [colors, setColors] = useState('')
  let [tags, setTags] = useState('')


  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteModal, setDeleteModal] = useState(false)


  const dispatch = useDispatch()
  const product = useSelector(state => state.products.products)

  const navigate = useNavigate()
  useEffect(() => {
     dispatch(fetchProductPrivateDetail(product_id))
  }, [])

  const handleSubmit = (e) => {
     e.preventDefault()
     const data = new FormData()
    tags = tags.split(','); colors = colors.split(',')
    data.append('p_img', product_imgs)
    data.append('name', name); data.append('description', description); data.append('price', price)
    data.append('qty_size', qty_size); data.append('colors', colors); data.append('tags', tags)
    data.append('qty', qty); data.append('product_id', product._id)
    
    dispatch(editProduct(data))
    setShowEditForm(false)
    navigate(`/dashboard/${category_name}/products/${product._id}/private/detail`, { replace: true })
  }

  const handleDeletion = () => {
     dispatch(deleteProduct({prod_id: product._id}))
     setDeleteModal(prev => !prev)
    navigate(`/dashboard/${category_name}/manage`, { replace: true })
  }
  
  const editSetFields = (e) => {
     setShowEditForm(prev => !prev)
     setName(product.name); setDescription(product.description)
     setPrice(product.price); setQty(product.qty)
     setColors(product.colors.toString())
     setTags(product.tags.toString())
     setQtySize(JSON.stringify(product.qty_size))
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
    if(!data.price) errors.price = 'price required'
    if(parseFloat(data.price) < 0) errors.price = 'price must be greater than 0.00'
    if(!data.colors) errors.colors = 'colors required'
    if(!data.tags) errors.tags = 'tags required'
    return errors
 }
  
  return (
    <div>
        <div className="product-detail-container">
            {Object.keys(product).includes('name') && (
                <div className="product-card">
                    <div className="product-card-img">
                        <img src={product?.product_imgs[0]?.url} alt="" /> 
                    </div>
                    <div className="product-card-content product-edit-padding">
                        <h4>{product.name}</h4>
                        <p>{product?.description}</p>
                        <p>${product?.price}</p>
                        <div className="product-card-link">
                            <button className='edit-button' onClick={editSetFields}>edit product</button>
                            <button className='delete-button' onClick={(e) => setDeleteModal(prev => !prev)}>delete product</button>
                        </div>
                    </div>
              </div>
            )}

            {showEditForm && (
                <div className="form-section-product-manage">
                    <h3>Edit product*</h3>
                    <div className="">
                    <form className='form' onSubmit={handleSubmit}>
                            <div>
                                <input type="text" value={name} onChange={e => setName(e.target.value)}
                                placeholder="name" aria-label='name'
                                />
                            </div>
                            <div className='multiple-field'>
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
                                <input type="file" onChange={handleImageUpload}/>
                            </div>

                            <div className='multiple-field'>
                                <input type="text" value={qty} onChange={e => setQty(e.target.value)} 
                                placeholder="quantity" aria-label='quantity'
                                />
                                <input type="text" value={price} onChange={e => setPrice(e.target.value)} 
                                    placeholder="price" aria-label='price'
                                />
                            </div>
                        
                            <div>
                                <textarea value={qty_size} onChange={e => setQtySize(e.target.value)} cols="30" rows="5"></textarea>
                            </div>
                            <button>edit product</button>
                    </form>
                   </div>
                </div>
            )}
        </div>
        {showDeleteModal && (
            <Modal closeModal={setDeleteModal}
               actionHandle={handleDeletion}
               modalTitle={`Do you really want to delete? ${product.name}`}
               modalContent={""}
            />
        )}
    </div>
  )
}

export default ProductDetailPrivate