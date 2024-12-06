import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  potigian: false,
  amdm: false
};

export const principalSlice = createSlice({
  name: 'principal',
  initialState,
  reducers: {
    setPotigian: (state) => {
      state.potigian = true;
      state.amdm = false;
    },
    setAmdm: (state) => {
      state.amdm = true;
      state.potigian = false;
    }
  }
});

export const { setPotigian, setAmdm } = principalSlice.actions;

export default principalSlice.reducer;