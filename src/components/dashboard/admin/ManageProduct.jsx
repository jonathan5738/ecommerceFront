import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
function ManageProduct() {
  const { category_name } = useParams()
  return (
    <div className='manage-product'>
        <ul>
            <li><a href={`/dashboard/${category_name}/manage/products/add`}>add product</a></li>
            <li><a href={`/dashboard/${category_name}/manage/products/all`}>list product</a></li>
        </ul>
    </div>
  )
}

export default ManageProduct