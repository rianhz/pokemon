import { TInitialState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

export type TInitial = {
  users: TInitialState[];
};

const initialState: TInitial = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.actions;
