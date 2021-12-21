import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { RootState } from '../store';
import { MoodOpttionWithTimeStamp } from '../types';

//define a type for slice state
interface HistoryState {
  value: MoodOpttionWithTimeStamp[];
}

//define initial state
const initialState = {
  value: [],
} as HistoryState;

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addMoodToHistory: (
      state,
      { payload }: PayloadAction<MoodOpttionWithTimeStamp[]>,
    ) => {
      state.value = payload;
    },
  },
});

export const { addMoodToHistory } = historySlice.actions;

//export const sliceText = (state: RootState) => state.;

export default historySlice.reducer;
