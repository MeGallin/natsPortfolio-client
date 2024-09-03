import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch hit count from the server
export const fetchHitCount = createAsyncThunk('hitCounter/fetchHitCount', async () => {
  const response = await fetch(`${import.meta.env.VITE_API_END_POINT}api/page-hits`);
  const data = await response.json();
  return data.hits.length;
});

const hitCounterSlice = createSlice({
  name: 'hitCounter',
  initialState: {
    hits: 0,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHitCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHitCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hits = action.payload;
      })
      .addCase(fetchHitCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default hitCounterSlice.reducer;