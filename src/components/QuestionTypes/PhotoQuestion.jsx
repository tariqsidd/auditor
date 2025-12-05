import React, { useRef, useState } from 'react';
import { Box, Button, Typography, IconButton, Paper } from '@mui/material';
import { Camera, X, Upload } from 'lucide-react';

const PhotoQuestion = ({ question, value, onChange, error, disabled }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {question.label}
      </Typography>
      
      {preview ? (
        <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
          <IconButton
            onClick={handleRemove}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            size="small"
          >
            <X size={20} />
          </IconButton>
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
          />
        </Paper>
      ) : (
        <Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={disabled}
          />
          <Button
            variant="outlined"
            startIcon={<Camera />}
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            fullWidth
          >
            Capture Photo
          </Button>
        </Box>
      )}
      
      {(error || question.helpText) && (
        <Typography variant="caption" color={error ? 'error' : 'text.secondary'} sx={{ mt: 1 }}>
          {error || question.helpText}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoQuestion;
