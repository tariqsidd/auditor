import React from 'react';
import { TextField } from '@mui/material';

const DateTimeQuestion = ({ question, value, onChange, error, disabled }) => {
  const getInputType = () => {
    switch (question.dateTimeType) {
      case 'date':
        return 'date';
      case 'time':
        return 'time';
      case 'datetime':
        return 'datetime-local';
      default:
        return 'date';
    }
  };

  return (
    <TextField
      fullWidth
      type={getInputType()}
      label={question.label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error || question.helpText}
      disabled={disabled}
      required={question.validations?.some((v) => v.rule === 'required')}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateTimeQuestion;
