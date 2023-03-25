
import { createSlice } from '@reduxjs/toolkit';
interface ICounterState {
  title: string;
  data: number;
}
const initialState: ICounterState = {
  title: 'test reducer slice counter reduxx toolkit in counter slice',
  data: 42
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // reducers thực hiện những hành động gì

    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;