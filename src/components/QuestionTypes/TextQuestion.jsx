import React from 'react';
import { TextField } from '@mui/material';

const TextQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <TextField
      fullWidth
      label={question.label}
      placeholder={question.placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error || question.helpText}
      disabled={disabled}
      multiline={question.multiline}
      rows={question.multiline ? 4 : 1}
      required={question.validations?.some((v) => v.rule === 'required')}
    />
  );
};

export default TextQuestion;
