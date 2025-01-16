'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import { AppDispatch, RootState } from '../state/store';
import { fetchGalleryImages } from '../state/imagesGallerySlice';
import { isAuthenticated } from '../auth';
import Button from './common/Button';
import { deleteGalleryImage } from '../state/imageDeleteSlice';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface ModalImageData {
  title: string;
  description: string;
  by: string;
  url: string;
  _id: string;
}

export default function Gallery() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // Get gallery state from Redux
  const { images, status, error } = useSelector(
    (state: RootState) => state.gallery,
  );

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ModalImageData | null>(
    null,
  );
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // Fetch images when component mounts
  useEffect(() => {
    dispatch(fetchGalleryImages());
    setAuthenticated(isAuthenticated());
  }, [dispatch]);

  const handleOpen = (image: ModalImageData) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleImageDelete = async () => {
    if (!selectedImage || !selectedImage._id) return;

    const result = await dispatch(deleteGalleryImage(selectedImage._id));

    if (deleteGalleryImage.fulfilled.match(result)) {
      handleClose();
      dispatch(fetchGalleryImages());
    } else {
      console.error('Failed to delete the image:', result.payload);
    }
  };

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">
          {error || 'Failed to load gallery images'}
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        padding: 4,
        maxWidth: 'lg',
      }}
    >
      <ImageList
        sx={{
          width: '100%',
          height: '100%',
          transform: 'translateZ(0)',
        }}
        variant="quilted"
        cols={matches ? 4 : 2}
        rowHeight={200}
      >
        {images.map((item) => (
          <ImageListItem
            key={item._id}
            cols={item.col || 1}
            rows={item.row || 1}
            onClick={() =>
              handleOpen({
                ...item,
              })
            }
            sx={{ cursor: 'pointer' }}
          >
            <img
              {...srcset(item.url, 200, item.row, item.col)}
              alt={item.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <ImageListItemBar
              title={item.title}
              subtitle={item.by}
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: matches ? '80%' : '95%',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          {selectedImage && (
            <>
              {authenticated && (
                <Button
                  text="Delete this Image"
                  color={'red'}
                  disabled={false}
                  style={buttonStyle}
                  onClick={handleImageDelete}
                />
              )}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                }}
              />

              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mt={2}
              >
                {selectedImage.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                By {selectedImage.by}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedImage.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
};
