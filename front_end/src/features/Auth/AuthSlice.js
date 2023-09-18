import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from './AuthAPI';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, setLocalStorage,removeLocalStorage } from '../../utils/storageUtils';
import { showNotiError, showNotiSuccess } from '../../component/Modal/notification';
export const login = createAsyncThunk('auth/login', async (params, { rejectWithValue }) => {
  try {
    const response = await AuthApi.getAPILogin({ ...params });
    console.log(response);
    setLocalStorage('token', response.data.token);
    setLocalStorage('username', response.data.user.name);
    setLocalStorage('idUsername', response.data.user.id);
    if(response) {
      showNotiSuccess(response.data.message);
      setTimeout(()=>{
        window.location.assign("/");
      },500)
    }
    // navigate('/');
    // return response.data;
  } 
  catch (error) {
    console.log(error);
    showNotiError(error.response.data.message);
    return rejectWithValue(error?.response?.data?.message || error?.response || error);
  }
});
export const changePassword = createAsyncThunk('auth/change_password', async (params, { rejectWithValue }) => {
  try {
    const response = await AuthApi.getAPIChangePassword({ ...params });
    console.log(response);
    if(response){
      showNotiSuccess(response.data.message)
    }
  } 
  catch (error) {
    console.log(error);
    showNotiError(error.response.data.message);
    setTimeout(()=>{
      window.location.assign('/login');
    },500)
    removeLocalStorage('token');
    removeLocalStorage('username');
    removeLocalStorage('idUsername');
    return rejectWithValue(error?.response?.data?.message || error?.response || error);
  }
});
export const getPersonalInformation = createAsyncThunk('auth/getInformationCustomer', async (params, { rejectWithValue }) => {
  try {
    const response = await AuthApi.getAPIInformationCustomer({ ...params });
    return response.data;
  } 
  catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.response || error);
  }
})


const initialState = {
  username: null,
  token: null,
  userInformation: {},
  permissionLists: []
};

export const authSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    logOutAction: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username')
    },
    checkPermission: (state, action) => {
      console.log(action.payload)
    }
  },
  extraReducers: (buider) => {
    buider
      // .addCase(login.fulfilled, (state, action) => {
      //   localStorage.setItem('token', action.payload.token);
      //   localStorage.setItem('username', action.payload.email);
      //   state.username = action.payload.email;
      //   state.token = action.payload.token;
      // })
      .addCase(getPersonalInformation.fulfilled, (state, action) => {
        state.userInformation = action.payload;
      })

     
  }
});

export const {
  logOutAction,
} = authSlice.actions;

export default authSlice.reducer;
