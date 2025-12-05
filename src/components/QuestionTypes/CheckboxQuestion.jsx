import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';

const CheckboxQuestion = ({ question, value, onChange, error, disabled }) => {
  const selectedValues = value || [];

  const handleChange = (optionValue, checked) => {
    if (checked) {
      onChange([...selectedValues, optionValue]);
    } else {
      onChange(selectedValues.filter((v) => v !== optionValue));
    }
  };

  return (
    <FormControl error={!!error} disabled={disabled} fullWidth>
      <FormLabel>{question.label}</FormLabel>
      <FormGroup>
        {question.options?.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {(error || question.helpText) && (
        <FormHelperText>{error || question.helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckboxQuestion;
