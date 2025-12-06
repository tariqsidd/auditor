import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Send } from 'lucide-react';
import useTemplateStore from '../store/templateStore';
import useFormStore from '../store/formStore';
import { QuestionComponents } from '../components/QuestionTypes';
import { shouldShowQuestion } from '../utils/conditionalLogic';
import { validateForm } from '../utils/validation';
import { calculateTotalScore, getScoreCategory } from '../utils/scoring';

const FormRenderer = () => {
  const { templateId, responseId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById } = useTemplateStore();
  const { createResponse, updateResponse, setAnswer, completeResponse, getResponseById } =
    useFormStore();

  const template = getTemplateById(templateId);
  const existingResponse = responseId ? getResponseById(responseId) : null;

  const [answers, setAnswers] = useState(existingResponse?.answers || {});
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(existingResponse);

  useEffect(() => {
    if (!existingResponse && template) {
      const newResponse = createResponse(templateId);
      setResponse(newResponse);
    }
  }, [templateId, template, existingResponse, createResponse]);

  if (!template) {
    return (
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: { xs: 2, sm: 3 }, py: 4 }}>
        <Alert severity="error">Template not found</Alert>
      </Box>
    );
  }

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (response) {
      setAnswer(response.id, questionId, value);
    }
    if (errors[questionId]) {
      setErrors({ ...errors, [questionId]: null });
    }
  };

  const validateCurrentSection = () => {
    const section = template.sections[currentSection];
    const visibleQuestions = section.questions.filter((q) => shouldShowQuestion(q, answers));
    const validation = validateForm(visibleQuestions, answers);

    if (!validation.isValid) {
      const newErrors = {};
      Object.entries(validation.results).forEach(([questionId, result]) => {
        if (!result.isValid) {
          newErrors[questionId] = result.errors[0];
        }
      });
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const handleSaveDraft = () => {
    if (response) {
      updateResponse(response.id, { status: 'draft' });
      navigate('/forms');
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentSection()) {
      return;
    }

    const scoreResult = calculateTotalScore(template, answers);
    const category = getScoreCategory(scoreResult.percentage);

    if (response) {
      completeResponse(response.id, scoreResult);
    }

    navigate('/forms', {
      state: {
        submitted: true,
        score: scoreResult,
        category,
      },
    });
  };

  const section = template.sections[currentSection];
  const visibleQuestions = section.questions.filter((q) => shouldShowQuestion(q, answers));
  const progress = ((currentSection + 1) / template.sections.length) * 100;

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: { xs: 2, sm: 3 }, py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {template.name}
        </Typography>

        {template.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {template.description}
          </Typography>
        )}

        {/* Mobile: Compact step indicator */}
        {template.sections.length > 1 && (
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 2,
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#f8f9fa',
            }}
          >
            {/* Step counter circle */}
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#111827',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.875rem',
                flexShrink: 0,
              }}
            >
              {currentSection + 1}/{template.sections.length}
            </Box>
            {/* Step info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}
              >
                Current Step
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {section.title}
              </Typography>
            </Box>
            {/* Mini progress dots */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {template.sections.map((_, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: idx <= currentSection ? '#111827' : '#d1d5db',
                    transition: 'background-color 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Desktop: Full stepper */}
        {template.sections.length > 1 && (
          <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 4 }}>
            <Stepper activeStep={currentSection}>
              {template.sections.map((sec) => (
                <Step key={sec.id}>
                  <StepLabel>{sec.title}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, display: { xs: 'none', md: 'block' } }} />

        <Typography variant="h5" sx={{ display: { xs: 'none', md: 'block' } }} gutterBottom>
          {section.title}
        </Typography>

        {/* Mobile section title */}
        <Typography variant="h6" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 600, mb: 2 }}>
          {section.title}
        </Typography>

        <Box sx={{ mt: 3 }}>
          {visibleQuestions.map((question) => {
            const QuestionComponent = QuestionComponents[question.type];
            if (!QuestionComponent) return null;

            return (
              <Box key={question.id} sx={{ mb: 3 }}>
                <QuestionComponent
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  error={errors[question.id]}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Box>
            <Button onClick={handleBack} disabled={currentSection === 0}>
              Back
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Save />} onClick={handleSaveDraft}>
              Save Draft
            </Button>

            {currentSection < template.sections.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" startIcon={<Send />} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormRenderer;
