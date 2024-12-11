import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append('image', file); // Key must match backend
      formData.append('title', title);
      formData.append('description', description);
      formData.append('by', by);

      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to upload image.');
      }

      const data = await response.json();
      return data.image;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An unexpected error occurred.');
    }
  },
);

const imageUploaderSlice = createSlice({
  name: 'imageUploader',
  initialState,
  reducers: {
    setFileInfo: (state, action) => {
      state.fileInfo = {
        name: action.payload.name,
        size: action.payload.size,
        type: action.payload.type,
      };
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBy: (state, action) => {
      state.by = action.payload;
    },
    setErrors: (state, action) => {
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
