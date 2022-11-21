import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
}

const initialState: UserState = {
  token: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = "";
    },
    storeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { removeToken, storeToken } = userDataSlice.actions;

export default userDataSlice.reducer;
