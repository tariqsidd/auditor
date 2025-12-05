export const calculateQuestionScore = (question, answer) => {
  if (!question.scoring || !question.scoring.enabled) {
    return null;
  }

  const { type, points, correctAnswer, scoreMapping } = question.scoring;

  switch (type) {
    case 'binary':
      return answer === correctAnswer ? points : 0;
    
    case 'weighted':
      if (scoreMapping && scoreMapping[answer] !== undefined) {
        return scoreMapping[answer];
      }
      return 0;
    
    case 'partial':
      if (Array.isArray(answer) && Array.isArray(correctAnswer)) {
        const correctCount = answer.filter((a) => correctAnswer.includes(a)).length;
        return (correctCount / correctAnswer.length) * points;
      }
      return 0;
    
    case 'range':
      if (typeof answer === 'number') {
        return answer;
      }
      return 0;
    
    default:
      return 0;
  }
};

export const calculateTotalScore = (template, answers) => {
  let totalScore = 0;
  let maxScore = 0;

  template.sections?.forEach((section) => {
    section.questions?.forEach((question) => {
      if (question.scoring && question.scoring.enabled) {
        const questionScore = calculateQuestionScore(question, answers[question.id]);
        totalScore += questionScore || 0;
        maxScore += question.scoring.points || 0;
      }
    });
  });

  return {
    score: totalScore,
    maxScore,
    percentage: maxScore > 0 ? (totalScore / maxScore) * 100 : 0,
  };
};

export const getScoreCategory = (percentage) => {
  if (percentage >= 90) return { label: 'Excellent', color: '#4caf50' };
  if (percentage >= 75) return { label: 'Good', color: '#8bc34a' };
  if (percentage >= 60) return { label: 'Satisfactory', color: '#ffc107' };
  if (percentage >= 50) return { label: 'Needs Improvement', color: '#ff9800' };
  return { label: 'Poor', color: '#f44336' };
};
