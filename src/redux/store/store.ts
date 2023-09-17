import { configureStore } from "@reduxjs/toolkit";
import { resultSlice } from "../features/resultSlice";
import { usersSlice } from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    result: resultSlice.reducer,
    users: usersSlice.reducer,
  },
});

function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("store", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
