import { ChangeEvent, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography, IconButton, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import Spinner from './Spinner';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
  const [status, setStatus] = useState<UploadStatus>('idle');

  useEffect(() => {
    // Clean up the URL when component unmounts or when file changes
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setFile(selectedFile);
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      setStatus('idle'); // Reset status when new file is selected
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    const formData = new FormData();
    formData.append('image', file); // Use the key 'image' to match backend
    formData.append('title', title); // Use actual title from input
    formData.append('description', description); // Use actual description from input
    formData.append('by', author); // Use actual author from input

    try {
      await axios.post(
        `${import.meta.env.VITE_API_END_POINT}api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setStatus('success');
      // Clear all inputs after successful upload
      setTimeout(() => {
        handleCancel();
      }, 2000); // Clear after 2 seconds so user can see success message
    } catch (error) {
      setStatus('error');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview('');
    }
    setStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setTitle('');
    setDescription('');
    setAuthor('');
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <form style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <fieldset style={{ 
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          margin: '0',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <legend style={{
            padding: '0 10px',
            color: '#333',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            Portfolio Image Upload
          </legend>

          <input
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
          />

          {!file && (
            <Button
              variant="contained"
              onClick={handleButtonClick}
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Choose Image
            </Button>
          )}

          {file && (
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

          {file && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              File name: {file.name}
            </Typography>
          )}

          {file && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                variant="outlined"
              />
            </Box>
          )}

          {file && status !== 'uploading' && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                sx={{ mr: 1 }}
              >
                Upload
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleButtonClick}
              >
                Choose Different Image
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

          {status === 'success' && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              File uploaded successfully!
            </Typography>
          )}

          {status === 'error' && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error uploading file.
            </Typography>
          )}
        </fieldset>
      </form>
    </Box>
  );
};

export default FileUploader;
