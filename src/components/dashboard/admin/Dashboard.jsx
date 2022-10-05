import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStore } from '../../../actions/store'
import { fetchCategories } from '../../../actions/category'
import '../../css/Dashboard/Dashboard.css'
function Dashboard() {
  const dispatch = useDispatch()
  const store = useSelector(state => state.store) 
  const categories = useSelector(state => state.categories.categories)
  useEffect(() => {
    dispatch(fetchStore())
    dispatch(fetchCategories())
  }, [])
  return (
    <div className='dashboard-container'>
         <div className='sidebar'>
            <div className="category-container">
               <a href="/dashboard/category/add">add category</a>
                {categories.length > 0 && (
                   <ul>
                      {categories?.map(category => {
                        return (
                            <li key={category._id} className="category-item">
                                 <a href={`/dashboard/${category.name}/manage`}>{category.name}</a>
                                 <div className="category-actions">
                                     <a href={`/dashboard/${category._id}/edit`}>edit</a>
                                 </div>
                            </li>
                        )
                      })}
                  </ul>
                )}
            </div>
       </div>
       <div className="main-container">

       </div>
    </div>
  )
}

export default Dashboard