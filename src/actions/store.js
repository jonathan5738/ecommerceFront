import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api/api' 
const storeSlice = createSlice({
    name: 'store',
    initialState: {
        data: {},
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchStore.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(fetchStore.rejected, (state) => {state.status = 'failed'})
            .addCase(fetchStore.pending, (state) => {state.status = 'pending'})
    }
})
export const storeReducer = storeSlice.reducer
export const fetchStore =  createAsyncThunk('store/fetchStore', async (dispatch) => {
    const response = await API.get('/store')
    return response.data
})