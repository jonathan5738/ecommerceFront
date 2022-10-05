import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api/api'
///products/clothes/all
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(fetchProducts.pending, (state) => { state.status = 'pending'})
            .addCase(fetchProducts.rejected, (state, action) => { 
                state.status = 'failed'
                state.error = action.error.message
            })
            // create product reducer functions
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(createProduct.pending, (state) => { state.status = 'pending'})
            .addCase(createProduct.rejected, (state, action) => { 
                state.status = 'failed'
                state.error = action.error.message
            })

            // fetch product public reducer functions 
            .addCase(fetchProductPublic.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(fetchProductPublic.pending, (state) => { state.status = 'pending'})
            .addCase(fetchProductPublic.rejected, (state, action) => { 
                state.status = 'failed'
                state.error = action.error.message
            })

            // fetch product detail private reducer functions 
            .addCase(fetchProductPrivateDetail.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(fetchProductPrivateDetail.pending, (state) => { state.status = 'pending'})
            .addCase(fetchProductPrivateDetail.rejected, (state, action) => { 
                state.status = 'failed'
                state.error = action.error.message
            })

            // edit product reducer 
            .addCase(editProduct.fulfilled, (state, action) => {
                state.products = action.payload 
                state.status = 'succeed'
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(editProduct.pending, (state) => {state.status = 'pending'})

            // delete product reducer 
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteProduct.pending, (state) => { state.status = 'pending'})

            // fetch user order reducer
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.products = action.payload
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUserOrders.pending, (state) => { state.status = 'pending'})

    }
})

export const productReducer = productSlice.reducer
export const fetchProducts = createAsyncThunk('products/fetchAll', async (data) => {
    const {size, price} = data
    const response = await API.post(`/products/${data.category_name}/all`, {size, price})
    return response.data
})

export const createProduct = createAsyncThunk('products/create', async (data) => {
    const response = await API.post('/products/new', data)
    return response.data
})

export const fetchProductPublic = createAsyncThunk('products/fetchProductPublic', async (product_slug) => {
    const response = await API.get(`/products/${product_slug}/detail`)
    return response.data
})

export const fetchProductPrivateDetail =  createAsyncThunk('products/fetchPostPrivateDetail', async (product_id) => {
    const response = await API.get(`/products/${product_id}/private/detail`)
    return response.data
})
export const editProduct = createAsyncThunk('products/editProduct', async (data) => {
    const response = await API.post('/products/edit', data)
    return response.data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct',  async (data) => {
    const response = await API.post('/products/delete', data)
    return response.data
})

export const fetchUserOrders = createAsyncThunk('products/userOrders', async () => {
    const response = await API.get('/products/orders/all')
    return response.data
})

