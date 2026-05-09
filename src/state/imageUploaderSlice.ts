import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getApiErrorMessage } from '../utils/api';
import { RootState } from './store';

interface ImageUploaderState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  fileInfo: {
    name: string;
    size: number;
    type: string;
  } | null;
  preview: string;
  title: string;
  description: string;
  by: string;
  errors: {
    title: string;
    description: string;
    by: string;
  };
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: ImageUploaderState = {
  status: 'idle',
  fileInfo: null,
  preview: '',
  title: '',
  description: '',
  by: '',
  errors: {
    title: '',
    description: '',
    by: '',
  },
  successMessage: null,
  errorMessage: null,
};

export const uploadImage = createAsyncThunk(
  'imageUploader/upload',
  async (
    {
      file,
      title,
      description,
      by,
    }: { file: File; title: string; description: string; by: string },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('authToken');

      if (!token) {
        return rejectWithValue('You must be logged in as an admin to upload images.');
      }

      const formData = new FormData();
      formData.append('image', file); // Key must match backend
      formData.append('title', title);
      formData.append('description', description);
      formData.append('by', by);

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        return rejectWithValue(
          await getApiErrorMessage(response, 'Failed to upload image.'),
        );
      }

      const data = await response.json();
      return data.image;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred.';
      return rejectWithValue(message);
    }
  },
);

const imageUploaderSlice = createSlice({
  name: 'imageUploader',
  initialState,
  reducers: {
    setFileInfo: (
      state,
      action: PayloadAction<{ name: string; size: number; type: string }>,
    ) => {
      state.fileInfo = {
        name: action.payload.name,
        size: action.payload.size,
        type: action.payload.type,
      };
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setBy: (state, action: PayloadAction<string>) => {
      state.by = action.payload;
    },
    setErrors: (state, action: PayloadAction<ImageUploaderState['errors']>) => {
      state.errors = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'uploading';
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.status = 'success';
        state.successMessage = 'Image uploaded successfully!';
        state.fileInfo = null;
        state.preview = '';
        state.title = '';
        state.description = '';
        state.by = '';
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  setFileInfo,
  setPreview,
  setTitle,
  setDescription,
  setBy,
  setErrors,
  resetForm,
} = imageUploaderSlice.actions;

export default imageUploaderSlice.reducer;
