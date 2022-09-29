import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api/api' 
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            // fetch categories reducer functions
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state) => {state.status = 'failed'})
            .addCase(fetchCategories.pending, (state) => {state.status = 'pending'})

            // create category reducer functions
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.categories = action.payload
            })
            .addCase(createCategory.rejected, (state) => {state.status = 'failed'})
            .addCase(createCategory.pending, (state) => {state.status = 'pending'})

            // category detail reducer functions 
            .addCase(categoryDetail.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.categories = action.payload
            })
            .addCase(categoryDetail.rejected, (state) => {state.status = 'failed'})
            .addCase(categoryDetail.pending, (state) => {state.status = 'pending'})

            // edit category reducer function
            .addCase(editCategory.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.categories = action.payload
            })
            .addCase(editCategory.rejected, (state) => {state.status = 'failed'})
            .addCase(editCategory.pending, (state) => {state.status = 'pending'})

            // delete category reducer function
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.categories = action.payload
            })
            .addCase(deleteCategory.rejected, (state) => {state.status = 'failed'})
            .addCase(deleteCategory.pending, (state) => {state.status = 'pending'})
    }
})

export const categoryReducer = categorySlice.reducer
export const fetchCategories =  createAsyncThunk('category/fetchCategories', async () => {
    const response = await API.get('/category')
    return response.data
})

export const createCategory = createAsyncThunk('category/createCategory', async (data) => {
    const response = await API.post('/category/new', data)
    return response.data
})

export const categoryDetail = createAsyncThunk('category/categoryDetail', async (category_id) => {
    const response = await API.get(`/category/private/${category_id}`)
    return response.data
})

export const editCategory = createAsyncThunk('category/editCategory', async (data) => {
    const response = await API.post('/category/edit', data)
    return response.data
})
export const deleteCategory =  createAsyncThunk('category/deleteCategory', async (data) => {
    const response = await API.post('/category/delete', data)
    return response.data
})