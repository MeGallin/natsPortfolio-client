import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactFormState {
  isSubmitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: ContactFormState = {
  isSubmitting: false,
  successMessage: null,
  errorMessage: null,
};

export const submitContactForm = createAsyncThunk(
  'contactForm/submit',
  async ({ name, email, message }: { name: string; email: string; message: string }) => {
    const response = await fetch(`${import.meta.env.VITE_API_END_POINT}api/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message.');
    }

    const data = await response.json();
    return data.data;
  }
);

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.successMessage = action.payload;
      })
      .addCase(submitContactForm.rejected, (state) => {
        state.isSubmitting = false;
        state.errorMessage = 'There was an error submitting the form. Please try again later.';
      });
  },
});

export default contactFormSlice.reducer;