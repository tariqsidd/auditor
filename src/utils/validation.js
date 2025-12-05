import { ValidationRule } from '../types';

export const validateField = (value, validations) => {
  if (!validations || validations.length === 0) {
    return { isValid: true, errors: [] };
  }

  const errors = [];

  validations.forEach((validation) => {
    const { rule, value: ruleValue, message } = validation;

    switch (rule) {
      case ValidationRule.REQUIRED:
        if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
          errors.push(message || 'This field is required');
        }
        break;

      case ValidationRule.MIN_LENGTH:
        if (value && String(value).length < ruleValue) {
          errors.push(message || `Minimum length is ${ruleValue} characters`);
        }
        break;

      case ValidationRule.MAX_LENGTH:
        if (value && String(value).length > ruleValue) {
          errors.push(message || `Maximum length is ${ruleValue} characters`);
        }
        break;

      case ValidationRule.MIN_VALUE:
        if (value && Number(value) < ruleValue) {
          errors.push(message || `Minimum value is ${ruleValue}`);
        }
        break;

      case ValidationRule.MAX_VALUE:
        if (value && Number(value) > ruleValue) {
          errors.push(message || `Maximum value is ${ruleValue}`);
        }
        break;

      case ValidationRule.PATTERN:
        if (value && !new RegExp(ruleValue).test(value)) {
          errors.push(message || 'Invalid format');
        }
        break;

      case ValidationRule.EMAIL:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          errors.push(message || 'Invalid email address');
        }
        break;

      case ValidationRule.URL:
        try {
          if (value) new URL(value);
        } catch {
          errors.push(message || 'Invalid URL');
        }
        break;

      case ValidationRule.PHONE:
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (value && !phoneRegex.test(value)) {
          errors.push(message || 'Invalid phone number');
        }
        break;

      default:
        break;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateForm = (questions, answers) => {
  const validationResults = {};
  let isFormValid = true;

  questions.forEach((question) => {
    const result = validateField(answers[question.id], question.validations);
    validationResults[question.id] = result;
    if (!result.isValid) {
      isFormValid = false;
    }
  });

  return {
    isValid: isFormValid,
    results: validationResults,
  };
};
