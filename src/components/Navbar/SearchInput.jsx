import React, {useState} from 'react'

function SearchInput() {
  const [productName, setProductName] = useState('')
  const handleSubmit = (e) => {
     e.preventDefault()
     console.log(productName)
  }
  return (
    <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Search products' value={productName}
          onChange={e => setProductName(e.target.value)}
         className='search-product'/>
    </form>
  )
}

export default SearchInput