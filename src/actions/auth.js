import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import API from '../api/api' 

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        status: null,
        error: null
    },
    reducers: {
        logoutUser: state => {
            state.data = {}
            localStorage.removeItem(process.env.REACT_APP_STORAGE_NAME)
        }
    },
    extraReducers(builder){
        builder
        // log in user reducer functions
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeed'
            state.data = action.payload
            localStorage.setItem(process.env.REACT_APP_STORAGE_NAME, JSON.stringify(action.payload))
        })
        .addCase(loginUser.rejected, (state) => {state.status = 'failed'})
        .addCase(loginUser.pending, (state) => {state.status = 'pending'})

        // sign user reducer functions
        .addCase(signUser.fulfilled, (state, action) => {
            state.status = 'succeed'
            state.data = action.payload
            localStorage.setItem(process.env.REACT_APP_STORAGE_NAME, JSON.stringify(action.payload))
        })
        .addCase(signUser.rejected, (state) => {state.status = 'failed'})
        .addCase(signUser.pending, (state) => {state.status = 'pending'})

        // edit user reducer functions
        .addCase(editUser.fulfilled, (state, action) => {
            state.status = 'succeed'
            state.data = action.payload
        })
        .addCase(editUser.rejected, (state) => {state.status = 'failed'})
        .addCase(editUser.pending, (state) => {state.status = 'pending'})
    }
})
export const authReducer = authSlice.reducer
export const { logoutUser } = authSlice.actions
export const loginUser = createAsyncThunk('auth/loginUser',async (data) => {
    const response = await API.post('/users/login', data)
    return response.data
})

export const signUser =  createAsyncThunk('auth/signUser', async (data) => {
    const response = await API.post('/users/signin', data)
    return response.data
})

export const editUser = createAsyncThunk('auth/editUser',  async (data) => {
    const response = await API.patch('/users/edit', data)
    return response.data
})