import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const DropdownQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <InputLabel>{question.label}</InputLabel>
      <Select value={value || ''} onChange={(e) => onChange(e.target.value)} label={question.label}>
        <MenuItem value="">
          <em>Select an option</em>
        </MenuItem>
        {question.options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || question.helpText) && (
        <FormHelperText>{error || question.helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DropdownQuestion;
