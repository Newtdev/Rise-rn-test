import {createSlice} from '@reduxjs/toolkit';


type AuthType = {
  user: any;
};

const initialState: AuthType = {
  user: {},
};

const globalStoreSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    handleSignIn: (state, {payload}) => {
      state.user = payload;
    },
  },
});

export const {handleSignIn} = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
