import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api/api' 
const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: {},
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(fetchProfile.rejected, (state) => {state.status = 'failed'})
            .addCase(fetchProfile.pending, (state) => {state.status = 'pending'})

            .addCase(addShipping.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(addShipping.rejected, (state) => {state.status = 'failed'})
            .addCase(addShipping.pending, (state) => {state.status = 'pending'})

            .addCase(editShipping.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(editShipping.rejected, (state) => {state.status = 'failed'})
            .addCase(editShipping.pending, (state) => {state.status = 'pending'})

            .addCase(setCurrentShipping.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.data = action.payload
            })
            .addCase(setCurrentShipping.rejected, (state) => {state.status = 'failed'})
            .addCase(setCurrentShipping.pending, (state) => {state.status = 'pending'})
    }
})
export const profileReducer = profileSlice.reducer
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    const response = await API.get('/profile/detail')
    return response.data
})

export const addShipping = createAsyncThunk('profile/addShipping', async (data) => {
    const response = await API.post('/profile/shipping/add', data)
    return response.data
})
      

export const editShipping =  createAsyncThunk('profile/editShipping', async (data) => {
    const response = await API.patch('/profile/shipping/edit', data)
    return response.data
})
export const setCurrentShipping =  createAsyncThunk('profile/setCurrentShipping', async (data) => {
    const response = await API.post('/profile/shipping/select/default', data)
    return response.data
})