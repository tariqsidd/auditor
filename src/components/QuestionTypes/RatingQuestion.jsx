import React from 'react';
import { Box, Typography, Rating as MuiRating } from '@mui/material';

const RatingQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {question.label}
      </Typography>
      
      <MuiRating
        value={value || 0}
        onChange={(_, newValue) => onChange(newValue)}
        max={question.maxRating || 5}
        disabled={disabled}
        size="large"
      />

      {(error || question.helpText) && (
        <Typography variant="caption" color={error ? 'error' : 'text.secondary'} sx={{ mt: 1 }}>
          {error || question.helpText}
        </Typography>
      )}
    </Box>
  );
};

export default RatingQuestion;
