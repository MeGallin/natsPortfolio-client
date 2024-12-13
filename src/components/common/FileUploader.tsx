import { ChangeEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Typography, IconButton, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import Spinner from './Spinner';
import {
  validateTitle,
  validateDescription,
  validateBy,
} from '../../utils/regEx';
import {
  uploadImage,
  setFileInfo,
  setPreview,
  setTitle,
  setDescription,
  setBy,
  setErrors,
  resetForm,
} from '../../state/imageUploaderSlice';
import { RootState, AppDispatch } from '../../state/store';

const FileUploader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    status,
    fileInfo,
    preview,
    title,
    description,
    by,
    errors,
    successMessage,
    errorMessage,
  } = useSelector((state: RootState) => state.imageUploader);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateForm = (): boolean => {
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    const byError = validateBy(by);

    dispatch(
      setErrors({
        title: titleError,
        description: descriptionError,
        by: byError,
      }),
    );

    return !titleError && !descriptionError && !byError && !!fileInfo;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      dispatch(
        setFileInfo({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        }),
      );
      const previewUrl = URL.createObjectURL(selectedFile);
      dispatch(setPreview(previewUrl));
    }
  };

  const handleFileUpload = async () => {
    if (!validateForm()) return;

    const file = fileInputRef.current?.files?.[0]; // Retrieve file
    console.log('Selected file:', file);

    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Check for file type (jpg and png)
    const validFileTypes = ['image/jpeg', 'image/png']; // MIME types for jpg and png
    if (!validFileTypes.includes(file.type)) {
      console.error('Invalid file type. Only JPG and PNG files are allowed.');
      alert('Invalid file type. Please upload a JPG or PNG file.');
      return;
    }

    dispatch(uploadImage({ file, title, description, by }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(resetForm());
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <form style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <fieldset
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            margin: '0',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <legend
            style={{
              padding: '0 10px',
              color: '#333',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Portfolio Image Upload
          </legend>

          <input
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
          />

          {!fileInfo && (
            <Button
              variant="contained"
              onClick={handleButtonClick}
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Choose Image
            </Button>
          )}

          {fileInfo && (
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
              <IconButton
                onClick={handleCancel}
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: -12,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <CancelIcon color="error" />
              </IconButton>
            </Box>
          )}

          {fileInfo && (
            <Box
              sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  dispatch(
                    setErrors({
                      ...errors,
                      title: validateTitle(e.target.value),
                    }),
                  );
                }}
                error={!!errors.title}
                helperText={errors.title}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => {
                  dispatch(setDescription(e.target.value));
                  dispatch(
                    setErrors({
                      ...errors,
                      description: validateDescription(e.target.value),
                    }),
                  );
                }}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                margin="normal"
              />

              <TextField
                fullWidth
                label="By"
                value={by}
                onChange={(e) => {
                  dispatch(setBy(e.target.value));
                  dispatch(
                    setErrors({
                      ...errors,
                      by: validateBy(e.target.value),
                    }),
                  );
                }}
                error={!!errors.by}
                helperText={errors.by}
                margin="normal"
              />
            </Box>
          )}

          {fileInfo && status === 'idle' && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleFileUpload}
                disabled={
                  !fileInfo ||
                  !title.trim() ||
                  !description.trim() ||
                  !by.trim() ||
                  !!errors.title ||
                  !!errors.description ||
                  !!errors.by
                }
                sx={{ mt: 2 }}
              >
                Upload
              </Button>
            </Box>
          )}

          {status === 'uploading' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Spinner />
            </Box>
          )}

          {successMessage && (
            <Typography color="success" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}

          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </fieldset>
      </form>
    </Box>
  );
};

export default FileUploader;
