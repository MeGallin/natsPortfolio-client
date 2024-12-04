import { ChangeEvent, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import Spinner from './Spinner';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
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
    formData.append('file', file);

    try {
      await axios.post('https://httpbin.org/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Portfolio Image upload
      </Typography>
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
    </Box>
  );
};

export default FileUploader;
