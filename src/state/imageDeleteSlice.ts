import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define the structure of a gallery image item
interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  by: string;
  url: string;
  col: number;
  row: number;
  createdAt: string;
  updatedAt: string;
}

// Define the state structure
interface GalleryState {
  images: GalleryImage[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: GalleryState = {
  images: [],
  status: 'idle',
  error: null,
};

// Async thunk to delete a gallery image
// Async thunk to delete a gallery image
export const deleteGalleryImage = createAsyncThunk(
  'gallery/deleteImage',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      // Get the token from the Redux auth state or localStorage
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/gallery-image-delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete gallery image');
      }

      await response.json();
      return id; // Return the deleted image ID
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

// Create the slice
const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGallery: (state) => {
      state.images = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGalleryImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        deleteGalleryImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          // Remove the deleted image from the state
          state.images = state.images.filter(
            (image) => image._id !== action.payload,
          );
        },
      )
      .addCase(deleteGalleryImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export const { clearGallery } = gallerySlice.actions;

export default gallerySlice.reducer;
