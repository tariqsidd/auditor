import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';

const YesNoQuestion = ({ question, value, onChange, error, disabled }) => {
  return (
    <FormControl error={!!error} disabled={disabled} fullWidth>
      <FormLabel>{question.label}</FormLabel>
      <RadioGroup value={value || ''} onChange={(e) => onChange(e.target.value)} row>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
        {question.allowNA && <FormControlLabel value="na" control={<Radio />} label="N/A" />}
      </RadioGroup>
      {(error || question.helpText) && (
        <FormHelperText>{error || question.helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default YesNoQuestion;
