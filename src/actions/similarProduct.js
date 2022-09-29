import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import API from '../api/api'
const similarProductSlice = createSlice({
    name: 'similarProduct',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchSimilarProducts.rejected, (state) => {
                state.status = 'failed'
            })
    }
})
export const similarProductReducer = similarProductSlice.reducer
export const fetchSimilarProducts = createAsyncThunk('products/similar', async(tag) => {
    const response = await API.get(`/products/${tag}/similar`)
    return response.data
})