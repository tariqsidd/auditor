import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
} from '@mui/material';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { QuestionType, ValidationRule, ConditionalOperator } from '../../types';

const QuestionEditor = ({ question, onUpdate, onDelete, allQuestions }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field, value) => {
    const updatedQuestion = { ...question, [field]: value };
    
    if (field === 'type') {
      const needsOptionsForNewType = [
        QuestionType.MULTIPLE_CHOICE,
        QuestionType.CHECKBOXES,
        QuestionType.DROPDOWN,
      ].includes(value);
      
      if (needsOptionsForNewType && (!question.options || question.options.length === 0)) {
        updatedQuestion.options = [
          { value: 'option_1', label: 'Option 1' }
        ];
      }
    }
    
    onUpdate(updatedQuestion);
  };

  const addOption = () => {
    const options = question.options || [];
    handleChange('options', [
      ...options,
      { value: `option_${options.length + 1}`, label: `Option ${options.length + 1}` },
    ]);
  };

  const updateOption = (index, field, value) => {
    const options = [...question.options];
    options[index] = { ...options[index], [field]: value };
    handleChange('options', options);
  };

  const removeOption = (index) => {
    handleChange('options', question.options.filter((_, i) => i !== index));
  };

  const addValidation = () => {
    const validations = question.validations || [];
    handleChange('validations', [
      ...validations,
      { rule: ValidationRule.REQUIRED, message: '' },
    ]);
  };

  const updateValidation = (index, field, value) => {
    const validations = [...question.validations];
    validations[index] = { ...validations[index], [field]: value };
    handleChange('validations', validations);
  };

  const removeValidation = (index) => {
    handleChange('validations', question.validations.filter((_, i) => i !== index));
  };

  const addCondition = () => {
    const conditionalLogic = question.conditionalLogic || { enabled: false, conditions: [], logic: 'AND' };
    handleChange('conditionalLogic', {
      ...conditionalLogic,
      conditions: [
        ...conditionalLogic.conditions,
        { questionId: '', operator: ConditionalOperator.EQUALS, value: '' },
      ],
    });
  };

  const updateCondition = (index, field, value) => {
    const conditionalLogic = { ...question.conditionalLogic };
    conditionalLogic.conditions[index] = { ...conditionalLogic.conditions[index], [field]: value };
    handleChange('conditionalLogic', conditionalLogic);
  };

  const removeCondition = (index) => {
    const conditionalLogic = { ...question.conditionalLogic };
    conditionalLogic.conditions = conditionalLogic.conditions.filter((_, i) => i !== index);
    handleChange('conditionalLogic', conditionalLogic);
  };

  const needsOptions = [
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.CHECKBOXES,
    QuestionType.DROPDOWN,
  ].includes(question.type);

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: '#fff',
        '&:hover': { borderColor: '#d1d5db' },
        transition: 'border-color 0.15s',
      }}
    >
      {/* Main Row: Drag Handle + Label + Type + Delete */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ color: 'text.disabled', cursor: 'grab', display: 'flex' }}>
          <GripVertical size={16} />
        </Box>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Question label"
          value={question.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          InputProps={{ disableUnderline: false }}
          sx={{
            '& .MuiInput-root': { fontSize: '0.875rem' },
            '& .MuiInput-underline:before': { borderColor: 'transparent' },
            '& .MuiInput-underline:hover:before': { borderColor: '#e5e7eb' },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={question.type}
            onChange={(e) => handleChange('type', e.target.value)}
            displayEmpty
            sx={{ fontSize: '0.75rem', '& .MuiSelect-select': { py: 0.75 } }}
          >
            {Object.entries(QuestionType).map(([key, value]) => (
              <MenuItem key={value} value={value} sx={{ fontSize: '0.75rem' }}>
                {key.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton size="small" onClick={onDelete} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
          <Trash2 size={16} />
        </IconButton>
      </Box>

      {/* Help Text - Inline */}
      <Box sx={{ pl: 3.5, mt: 1 }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Help text (optional)"
          value={question.helpText || ''}
          onChange={(e) => handleChange('helpText', e.target.value)}
          sx={{
            '& .MuiInput-root': { fontSize: '0.75rem', color: 'text.secondary' },
            '& .MuiInput-underline:before': { borderColor: 'transparent' },
            '& .MuiInput-underline:hover:before': { borderColor: '#e5e7eb' },
          }}
        />
      </Box>

      {/* Options for choice-based questions */}
      {needsOptions && (
        <Box sx={{ pl: 3.5, mt: 1.5 }}>
          <Stack spacing={0.75}>
            {question.options?.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'divider' }} />
                <TextField
                  size="small"
                  placeholder="Option label"
                  value={option.label}
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    const options = [...question.options];
                    options[index] = {
                      ...options[index],
                      label: newLabel,
                      value: newLabel.toLowerCase().replace(/\s+/g, '_')
                    };
                    handleChange('options', options);
                  }}
                  sx={{ flex: 1, '& .MuiOutlinedInput-input': { py: 0.75, fontSize: '0.8125rem' } }}
                />
                <IconButton size="small" onClick={() => removeOption(index)} sx={{ color: 'text.disabled' }}>
                  <Trash2 size={14} />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button
            size="small"
            startIcon={<Plus size={14} />}
            onClick={addOption}
            sx={{ mt: 1, ml: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            Add option
          </Button>
        </Box>
      )}

      {/* Advanced Settings - Collapsible */}
      <Box sx={{ mt: 1.5 }}>
        <Button
          size="small"
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            px: 0,
            minWidth: 'auto',
            fontSize: '0.75rem',
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'transparent', color: 'text.primary' },
          }}
        >
          {expanded ? 'Hide advanced' : 'Show advanced'}
        </Button>

        {expanded && (
          <Box sx={{ mt: 1, pl: 0 }}>
            <Stack spacing={2}>
              {/* Validations */}
              <Box>
                <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Validations
                </Typography>
                <Stack spacing={0.75}>
                  {question.validations?.map((validation, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <FormControl size="small" sx={{ minWidth: 100 }}>
                        <Select
                          value={validation.rule}
                          onChange={(e) => updateValidation(index, 'rule', e.target.value)}
                          sx={{ fontSize: '0.75rem' }}
                        >
                          {Object.entries(ValidationRule).map(([key, value]) => (
                            <MenuItem key={value} value={value} sx={{ fontSize: '0.75rem' }}>
                              {key.replace(/_/g, ' ')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        size="small"
                        placeholder="Value"
                        value={validation.value || ''}
                        onChange={(e) => updateValidation(index, 'value', e.target.value)}
                        sx={{ width: 80, '& input': { fontSize: '0.75rem' } }}
                      />
                      <TextField
                        size="small"
                        placeholder="Error message"
                        value={validation.message || ''}
                        onChange={(e) => updateValidation(index, 'message', e.target.value)}
                        sx={{ flex: 1, '& input': { fontSize: '0.75rem' } }}
                      />
                      <IconButton size="small" onClick={() => removeValidation(index)} sx={{ color: 'text.disabled' }}>
                        <Trash2 size={14} />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
                <Button size="small" startIcon={<Plus size={14} />} onClick={addValidation} sx={{ mt: 0.75, color: 'text.secondary', fontSize: '0.7rem' }}>
                  Add validation
                </Button>
              </Box>

              {/* Conditional Logic */}
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={question.conditionalLogic?.enabled || false}
                      onChange={(e) =>
                        handleChange('conditionalLogic', {
                          ...(question.conditionalLogic || {}),
                          enabled: e.target.checked,
                        })
                      }
                    />
                  }
                  label={<Typography sx={{ fontSize: '0.75rem' }}>Conditional logic</Typography>}
                />

                {question.conditionalLogic?.enabled && (
                  <Box sx={{ mt: 1, pl: 1 }}>
                    <FormControl size="small" sx={{ mb: 1, minWidth: 140 }}>
                      <Select
                        value={question.conditionalLogic.logic || 'AND'}
                        onChange={(e) =>
                          handleChange('conditionalLogic', {
                            ...question.conditionalLogic,
                            logic: e.target.value,
                          })
                        }
                        sx={{ fontSize: '0.75rem' }}
                      >
                        <MenuItem value="AND" sx={{ fontSize: '0.75rem' }}>AND (All)</MenuItem>
                        <MenuItem value="OR" sx={{ fontSize: '0.75rem' }}>OR (Any)</MenuItem>
                      </Select>
                    </FormControl>

                    <Stack spacing={0.75}>
                      {question.conditionalLogic.conditions?.map((condition, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={condition.questionId}
                              onChange={(e) => updateCondition(index, 'questionId', e.target.value)}
                              displayEmpty
                              sx={{ fontSize: '0.75rem' }}
                            >
                              <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Question</MenuItem>
                              {allQuestions
                                ?.filter((q) => q.id !== question.id)
                                .map((q) => (
                                  <MenuItem key={q.id} value={q.id} sx={{ fontSize: '0.75rem' }}>
                                    {q.label}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                              value={condition.operator}
                              onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                              sx={{ fontSize: '0.75rem' }}
                            >
                              {Object.entries(ConditionalOperator).map(([key, value]) => (
                                <MenuItem key={value} value={value} sx={{ fontSize: '0.75rem' }}>
                                  {key.replace(/_/g, ' ')}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            size="small"
                            placeholder="Value"
                            value={condition.value}
                            onChange={(e) => updateCondition(index, 'value', e.target.value)}
                            sx={{ flex: 1, '& input': { fontSize: '0.75rem' } }}
                          />
                          <IconButton size="small" onClick={() => removeCondition(index)} sx={{ color: 'text.disabled' }}>
                            <Trash2 size={14} />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                    <Button size="small" startIcon={<Plus size={14} />} onClick={addCondition} sx={{ mt: 0.75, color: 'text.secondary', fontSize: '0.7rem' }}>
                      Add condition
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Scoring */}
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={question.scoring?.enabled || false}
                      onChange={(e) =>
                        handleChange('scoring', {
                          ...(question.scoring || {}),
                          enabled: e.target.checked,
                        })
                      }
                    />
                  }
                  label={<Typography sx={{ fontSize: '0.75rem' }}>Scoring</Typography>}
                />

                {question.scoring?.enabled && (
                  <Box sx={{ mt: 1, pl: 1 }}>
                    <TextField
                      size="small"
                      type="number"
                      placeholder="Points"
                      value={question.scoring.points || 0}
                      onChange={(e) =>
                        handleChange('scoring', {
                          ...question.scoring,
                          points: Number(e.target.value),
                        })
                      }
                      sx={{ width: 80, '& input': { fontSize: '0.75rem' } }}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default QuestionEditor;
