'use client';

import React, { useState, useRef } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';

// Updated itemData with descriptions
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
    rows: 1,
    cols: 1,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface Annotation {
  x: number;
  y: number;
  text: string;
}

interface ImageData {
  img: string;
  title: string;
  author: string;
  rows?: number;
  cols?: number;
  description: string;
}

export default function Gallery() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null,
  );
  const imageRef = useRef<HTMLImageElement>(null);

  const handleOpen = (img: ImageData) => {
    setSelectedImage(img);
    setOpen(true);
    setAnnotations([]);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setAnnotations([]);
    setCurrentAnnotation(null);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setCurrentAnnotation({ x, y, text: '' });
    }
  };

  const handleAnnotationTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (currentAnnotation) {
      setCurrentAnnotation({ ...currentAnnotation, text: event.target.value });
    }
  };

  const handleAnnotationSubmit = () => {
    if (currentAnnotation) {
      setAnnotations([...annotations, currentAnnotation]);
      setCurrentAnnotation(null);
    }
  };

  const getColumns = () => {
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 3;
    return 4;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <ImageList
        variant="quilted"
        cols={getColumns()}
        rowHeight={121}
        className="w-full"
        gap={16}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            className="cursor-pointer"
            onClick={() => handleOpen(item)}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-md"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-image"
        aria-describedby="modal-image-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: '8px',
            overflowY: 'auto',
          }}
        >
          {selectedImage && (
            <>
              <div className="relative">
                <img
                  ref={imageRef}
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  onClick={handleImageClick}
                  className="w-full h-auto object-contain cursor-crosshair"
                />
                {annotations.map((annotation, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: `${annotation.x}%`,
                      top: `${annotation.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 1 }}>
                {selectedImage.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                by: {selectedImage.author}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedImage.description}
              </Typography>
            </>
          )}
          {currentAnnotation && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Annotation text"
                variant="outlined"
                value={currentAnnotation.text}
                onChange={handleAnnotationTextChange}
              />
              <Button
                variant="contained"
                onClick={handleAnnotationSubmit}
                sx={{ mt: 1 }}
              >
                Add Annotation
              </Button>
            </Box>
          )}
          {annotations.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <h3 className="text-xl font-bold mb-2">Annotations:</h3>
              <ul className="list-decimal pl-5">
                {annotations.map((annotation, index) => (
                  <li key={index} className="mb-1">
                    {annotation.text}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}
