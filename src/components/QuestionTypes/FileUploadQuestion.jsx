import React, { useRef } from 'react';
import { Box, Button, Typography, Chip, Stack } from '@mui/material';
import { Upload, X } from 'lucide-react';

const FileUploadQuestion = ({ question, value, onChange, error, disabled }) => {
  const fileInputRef = useRef(null);
  const files = value || [];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const filePromises = newFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            data: reader.result,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((fileData) => {
      onChange([...files, ...fileData]);
    });
  };

  const handleRemove = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {question.label}
      </Typography>

      <input
        ref={fileInputRef}
        type="file"
        multiple={question.allowMultiple}
        accept={question.acceptedFileTypes?.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <Button
        variant="outlined"
        startIcon={<Upload />}
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        fullWidth
      >
        Upload Files
      </Button>

      {files.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              onDelete={() => handleRemove(index)}
              deleteIcon={<X size={16} />}
            />
          ))}
        </Stack>
      )}

      {(error || question.helpText) && (
        <Typography variant="caption" color={error ? 'error' : 'text.secondary'} sx={{ mt: 1 }}>
          {error || question.helpText}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadQuestion;
