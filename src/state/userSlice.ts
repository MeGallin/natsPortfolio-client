import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

// Thunk to fetch user details from the API
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the token from the Redux auth state or localStorage
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/user-details`,
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
        throw new Error(data.message || 'Failed to fetch user details');
      }

      return data.userDetails; // Return the userDetails object
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

// Thunk to update user details via PATCH request
export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (
    updatedDetails: { id: string; name: string; email: string },
    { getState, rejectWithValue },
  ) => {
    try {
      const { id, ...details } = updatedDetails;
      // Get the token from the Redux auth state or localStorage
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/user-update/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details), // Use the rest of the details
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user details');
      }

      return data.userDetails; // Return the updated userDetails object
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isAdmin: boolean;
  isConfirmed: boolean;
  profileImage: string | null;
  cloudinaryId: string | null;
  ipAddress: string | null;
  loginCounter: number;
  registeredWithGoogle: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAdmin: false,
  isConfirmed: false,
  profileImage: null,
  cloudinaryId: null,
  ipAddress: null,
  loginCounter: 0,
  registeredWithGoogle: false,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      // Update the state with user details
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isConfirmed = action.payload.isConfirmed;
      state.profileImage = action.payload.profileImage;
      state.cloudinaryId = action.payload.cloudinaryId;
      state.ipAddress = action.payload.ipAddress;
      state.loginCounter = action.payload.loginCounter;
      state.registeredWithGoogle = action.payload.registeredWithGoogle;
    },
    clearUserDetails: (state) => {
      // Clear the user details
      state.id = null;
      state.name = null;
      state.email = null;
      state.isAdmin = false;
      state.isConfirmed = false;
      state.profileImage = null;
      state.cloudinaryId = null;
      state.ipAddress = null;
      state.loginCounter = 0;
      state.registeredWithGoogle = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Directly assign the fetched user details to the state
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isAdmin = action.payload.isAdmin;
        state.isConfirmed = action.payload.isConfirmed;
        state.profileImage = action.payload.profileImage;
        state.cloudinaryId = action.payload.cloudinaryId;
        state.ipAddress = action.payload.ipAddress;
        state.loginCounter = action.payload.loginCounter;
        state.registeredWithGoogle = action.payload.registeredWithGoogle;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          // Update the state with the updated user details
          state.name = action.payload.name;
          state.email = action.payload.email;
         
        } else {
          state.error = 'Failed to update user details';
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
