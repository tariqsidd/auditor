import { ConditionalOperator } from '../types';

export const evaluateCondition = (condition, answers) => {
  const { questionId, operator, value } = condition;

  // If condition is incomplete, don't show the question
  if (!questionId || !operator) {
    return false;
  }

  const answer = answers[questionId];

  switch (operator) {
    case ConditionalOperator.EQUALS:
      return answer === value;

    case ConditionalOperator.NOT_EQUALS:
      return answer !== value;

    case ConditionalOperator.CONTAINS:
      if (Array.isArray(answer)) {
        return answer.includes(value);
      }
      return String(answer || '').includes(value);

    case ConditionalOperator.GREATER_THAN:
      return Number(answer) > Number(value);

    case ConditionalOperator.LESS_THAN:
      return Number(answer) < Number(value);

    case ConditionalOperator.IS_EMPTY:
      return !answer || answer === '' || (Array.isArray(answer) && answer.length === 0);

    case ConditionalOperator.IS_NOT_EMPTY:
      return !!answer && answer !== '' && (!Array.isArray(answer) || answer.length > 0);

    default:
      // Unknown operator - don't show the question
      return false;
  }
};

export const shouldShowQuestion = (question, answers) => {
  if (!question.conditionalLogic || !question.conditionalLogic.enabled) {
    return true;
  }

  const { conditions, logic } = question.conditionalLogic;
  
  if (!conditions || conditions.length === 0) {
    return true;
  }

  const results = conditions.map((condition) => evaluateCondition(condition, answers));

  if (logic === 'AND') {
    return results.every((result) => result);
  } else if (logic === 'OR') {
    return results.some((result) => result);
  }

  return true;
};

export const getVisibleQuestions = (questions, answers) => {
  return questions.filter((question) => shouldShowQuestion(question, answers));
};
