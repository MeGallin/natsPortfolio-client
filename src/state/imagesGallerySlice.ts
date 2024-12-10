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

// Async thunk to fetch gallery images
export const fetchGalleryImages = createAsyncThunk(
  'gallery/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/gallery-images`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch gallery images');
      }

      const data = await response.json();
      return data.images; // Return the images array
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
      .addCase(fetchGalleryImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchGalleryImages.fulfilled,
        (state, action: PayloadAction<GalleryImage[]>) => {
          state.status = 'succeeded';
          state.images = action.payload;
        },
      )
      .addCase(
        fetchGalleryImages.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string | null;
        },
      );
  },
});

export const { clearGallery } = gallerySlice.actions;

export default gallerySlice.reducer;