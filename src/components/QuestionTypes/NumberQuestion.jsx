import React from 'react';
import { TextField } from '@mui/material';

const NumberQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <TextField
      fullWidth
      type="number"
      label={question.label}
      placeholder={question.placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error || question.helpText}
      disabled={disabled}
      required={question.validations?.some((v) => v.rule === 'required')}
      inputProps={{
        min: question.min,
        max: question.max,
        step: question.step || 1,
      }}
    />
  );
};

export default NumberQuestion;
