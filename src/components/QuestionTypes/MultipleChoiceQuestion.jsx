import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';

const MultipleChoiceQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <FormControl error={!!error} disabled={disabled} fullWidth>
      <FormLabel>{question.label}</FormLabel>
      <RadioGroup value={value || ''} onChange={(e) => onChange(e.target.value)}>
        {question.options?.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || question.helpText) && (
        <FormHelperText>{error || question.helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default MultipleChoiceQuestion;
