import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define the structure of a contact item
interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the state structure
interface ContactsInfoState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ContactsInfoState = {
  contacts: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch contacts information
export const fetchContactsInfo = createAsyncThunk(
  'contacts/fetchContactsInfo',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the token from the Redux auth state or localStorage
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/contacts`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contacts information');
      }

      return data.contacts; // Return the contacts array
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

// Create the slice
const contactsInfoSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // You can add any synchronous reducers here if needed
    clearContactsInfo: (state) => {
      state.contacts = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchContactsInfo.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.status = 'succeeded';
          state.contacts = action.payload;
        },
      )
      .addCase(
        fetchContactsInfo.rejected,
        (state, action: PayloadAction<string | null>) => {
          state.status = 'failed';
          state.error = action.payload;
        },
      );
  },
});

// Export actions and reducer
export const { clearContactsInfo } = contactsInfoSlice.actions;
export default contactsInfoSlice.reducer;
