import { configureStore } from '@reduxjs/toolkit' 
import { productReducer } from '../actions/product'
import { authReducer } from '../actions/auth'
import { categoryReducer } from '../actions/category' 
import { profileReducer } from '../actions/profile'
import { similarProductReducer } from '../actions/similarProduct'

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        profile: profileReducer,
        categories: categoryReducer,
        similarProducts: similarProductReducer
    }
})

