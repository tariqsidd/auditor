import { QuestionType, ValidationRule, ConditionalOperator } from '../types';

export const sampleTemplates = [
  {
    id: 'sample-1',
    name: 'Workplace Safety Inspection',
    description: 'Comprehensive workplace safety audit template',
    category: 'Safety',
    tags: ['safety', 'workplace', 'inspection'],
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'General Information',
        questions: [
          {
            id: 'q1',
            type: QuestionType.TEXT,
            label: 'Inspector Name',
            helpText: 'Enter the name of the person conducting the inspection',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Inspector name is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q2',
            type: QuestionType.DATE,
            label: 'Inspection Date',
            dateTimeType: 'date',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Inspection date is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q3',
            type: QuestionType.TEXT,
            label: 'Location/Department',
            helpText: 'Specify the location or department being inspected',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Location is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Safety Equipment',
        questions: [
          {
            id: 'q4',
            type: QuestionType.YES_NO,
            label: 'Are fire extinguishers accessible and properly maintained?',
            allowNA: true,
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'This question is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: {
              enabled: true,
              type: 'binary',
              points: 10,
              correctAnswer: 'yes',
            },
          },
          {
            id: 'q5',
            type: QuestionType.TEXTAREA,
            label: 'Describe any issues found',
            multiline: true,
            helpText: 'Provide details about any safety equipment issues',
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q4',
                  operator: ConditionalOperator.EQUALS,
                  value: 'no',
                },
              ],
              logic: 'AND',
            },
            validations: [],
            scoring: { enabled: false },
          },
          {
            id: 'q6',
            type: QuestionType.PHOTO,
            label: 'Upload photo of the issue',
            helpText: 'Take a photo of any safety concerns',
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q4',
                  operator: ConditionalOperator.EQUALS,
                  value: 'no',
                },
              ],
              logic: 'AND',
            },
            validations: [],
            scoring: { enabled: false },
          },
          {
            id: 'q7',
            type: QuestionType.YES_NO,
            label: 'Are emergency exits clearly marked and unobstructed?',
            allowNA: false,
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'This question is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: {
              enabled: true,
              type: 'binary',
              points: 10,
              correctAnswer: 'yes',
            },
          },
          {
            id: 'q8',
            type: QuestionType.CHECKBOXES,
            label: 'Which safety equipment is present?',
            options: [
              { value: 'first_aid', label: 'First Aid Kit' },
              { value: 'eye_wash', label: 'Eye Wash Station' },
              { value: 'safety_shower', label: 'Safety Shower' },
              { value: 'spill_kit', label: 'Spill Kit' },
              { value: 'ppe', label: 'Personal Protective Equipment' },
            ],
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Overall Assessment',
        questions: [
          {
            id: 'q9',
            type: QuestionType.RATING,
            label: 'Overall Safety Rating',
            maxRating: 5,
            helpText: 'Rate the overall safety condition (1-5 stars)',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Rating is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: {
              enabled: true,
              type: 'range',
              points: 5,
            },
          },
          {
            id: 'q10',
            type: QuestionType.TEXTAREA,
            label: 'Additional Comments',
            multiline: true,
            helpText: 'Any additional observations or recommendations',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q11',
            type: QuestionType.SIGNATURE,
            label: 'Inspector Signature',
            helpText: 'Sign to confirm the inspection',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Signature is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
    ],
  },
  {
    id: 'sample-2',
    name: 'Customer Satisfaction Survey',
    description: 'Gather customer feedback and satisfaction ratings',
    category: 'Survey',
    tags: ['customer', 'feedback', 'satisfaction'],
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Customer Information',
        questions: [
          {
            id: 'q1',
            type: QuestionType.TEXT,
            label: 'Name',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Name is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q2',
            type: QuestionType.TEXT,
            label: 'Email',
            validations: [
              {
                rule: ValidationRule.EMAIL,
                message: 'Please enter a valid email',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Satisfaction Rating',
        questions: [
          {
            id: 'q3',
            type: QuestionType.RATING,
            label: 'How satisfied are you with our service?',
            maxRating: 5,
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Rating is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q4',
            type: QuestionType.MULTIPLE_CHOICE,
            label: 'How likely are you to recommend us?',
            options: [
              { value: '1', label: 'Very Unlikely' },
              { value: '2', label: 'Unlikely' },
              { value: '3', label: 'Neutral' },
              { value: '4', label: 'Likely' },
              { value: '5', label: 'Very Likely' },
            ],
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please select an option',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q5',
            type: QuestionType.TEXTAREA,
            label: 'What can we improve?',
            multiline: true,
            helpText: 'Please share your suggestions',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
    ],
  },
  {
    id: 'sample-3',
    name: 'Conditional Logic Demo - Complete Guide',
    description: 'Comprehensive template demonstrating all conditional logic operators and features',
    category: 'Demo',
    tags: ['demo', 'conditional-logic', 'tutorial'],
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Basic Conditional Logic',
        questions: [
          {
            id: 'q1',
            type: QuestionType.YES_NO,
            label: 'Do you have previous experience?',
            helpText: 'This will determine which questions appear next',
            allowNA: false,
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'This question is required',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q2',
            type: QuestionType.NUMBER,
            label: 'How many years of experience do you have?',
            helpText: 'Only shown if you answered "Yes" above (EQUALS operator)',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Years of experience is required',
              },
              {
                rule: ValidationRule.MIN_VALUE,
                value: '1',
                message: 'Must be at least 1 year',
              },
            ],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q1',
                  operator: ConditionalOperator.EQUALS,
                  value: 'yes',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q3',
            type: QuestionType.TEXTAREA,
            label: 'What skills would you like to learn?',
            helpText: 'Only shown if you answered "No" above (NOT_EQUALS operator)',
            multiline: true,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q1',
                  operator: ConditionalOperator.NOT_EQUALS,
                  value: 'yes',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q4',
            type: QuestionType.DROPDOWN,
            label: 'What is your experience level?',
            helpText: 'Shown only if you have experience (EQUALS yes)',
            options: [
              { value: 'junior', label: 'Junior (1-3 years)' },
              { value: 'mid', label: 'Mid-Level (3-7 years)' },
              { value: 'senior', label: 'Senior (7+ years)' },
              { value: 'expert', label: 'Expert (10+ years)' },
            ],
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please select your experience level',
              },
            ],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q1',
                  operator: ConditionalOperator.EQUALS,
                  value: 'yes',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Advanced Operators (GREATER/LESS THAN)',
        questions: [
          {
            id: 'q5',
            type: QuestionType.NUMBER,
            label: 'What is your age?',
            helpText: 'Used for age-based conditional questions',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Age is required',
              },
              {
                rule: ValidationRule.MIN_VALUE,
                value: '18',
                message: 'Must be at least 18',
              },
              {
                rule: ValidationRule.MAX_VALUE,
                value: '100',
                message: 'Please enter a valid age',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q6',
            type: QuestionType.MULTIPLE_CHOICE,
            label: 'Are you eligible for senior citizen benefits?',
            helpText: 'Only shown if age is GREATER_THAN 65',
            options: [
              { value: 'yes_interested', label: 'Yes, I am interested' },
              { value: 'yes_not_interested', label: 'Yes, but not interested' },
              { value: 'no', label: 'No' },
            ],
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q5',
                  operator: ConditionalOperator.GREATER_THAN,
                  value: '65',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q7',
            type: QuestionType.TEXT,
            label: 'What college are you planning to attend?',
            helpText: 'Only shown if age is LESS_THAN 25',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q5',
                  operator: ConditionalOperator.LESS_THAN,
                  value: '25',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q8',
            type: QuestionType.RATING,
            label: 'Rate your work-life balance',
            helpText: 'Shown for working age adults (age between 25-65)',
            maxRating: 5,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q5',
                  operator: ConditionalOperator.GREATER_THAN,
                  value: '25',
                },
                {
                  questionId: 'q5',
                  operator: ConditionalOperator.LESS_THAN,
                  value: '65',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'CONTAINS Operator',
        questions: [
          {
            id: 'q9',
            type: QuestionType.CHECKBOXES,
            label: 'What programming languages do you know?',
            helpText: 'Select all that apply',
            options: [
              { value: 'javascript', label: 'JavaScript' },
              { value: 'python', label: 'Python' },
              { value: 'java', label: 'Java' },
              { value: 'csharp', label: 'C#' },
              { value: 'php', label: 'PHP' },
              { value: 'ruby', label: 'Ruby' },
              { value: 'go', label: 'Go' },
              { value: 'rust', label: 'Rust' },
            ],
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q10',
            type: QuestionType.TEXT,
            label: 'Which JavaScript framework do you prefer?',
            helpText: 'Only shown if JavaScript is selected (CONTAINS operator)',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q9',
                  operator: ConditionalOperator.CONTAINS,
                  value: 'javascript',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q11',
            type: QuestionType.TEXTAREA,
            label: 'Describe your Python projects',
            helpText: 'Only shown if Python is selected (CONTAINS operator)',
            multiline: true,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q9',
                  operator: ConditionalOperator.CONTAINS,
                  value: 'python',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q12',
            type: QuestionType.YES_NO,
            label: 'Are you interested in learning modern systems programming?',
            helpText: 'Only shown if you know EITHER Go OR Rust (OR logic with CONTAINS)',
            allowNA: false,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q9',
                  operator: ConditionalOperator.CONTAINS,
                  value: 'go',
                },
                {
                  questionId: 'q9',
                  operator: ConditionalOperator.CONTAINS,
                  value: 'rust',
                },
              ],
              logic: 'OR',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-4',
        title: 'IS_EMPTY and IS_NOT_EMPTY Operators',
        questions: [
          {
            id: 'q13',
            type: QuestionType.TEXT,
            label: 'Company Name (Optional)',
            helpText: 'Leave empty if you are not currently employed',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q14',
            type: QuestionType.TEXT,
            label: 'Job Title',
            helpText: 'Only shown if Company Name IS_NOT_EMPTY',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Job title is required',
              },
            ],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q13',
                  operator: ConditionalOperator.IS_NOT_EMPTY,
                  value: '',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q15',
            type: QuestionType.NUMBER,
            label: 'Years at current company',
            helpText: 'Only shown if Company Name IS_NOT_EMPTY',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q13',
                  operator: ConditionalOperator.IS_NOT_EMPTY,
                  value: '',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q16',
            type: QuestionType.YES_NO,
            label: 'Are you currently seeking employment?',
            helpText: 'Only shown if Company Name IS_EMPTY',
            allowNA: false,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q13',
                  operator: ConditionalOperator.IS_EMPTY,
                  value: '',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q17',
            type: QuestionType.TEXTAREA,
            label: 'What type of position are you looking for?',
            helpText: 'Shown if NOT employed AND seeking work (AND logic)',
            multiline: true,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q13',
                  operator: ConditionalOperator.IS_EMPTY,
                  value: '',
                },
                {
                  questionId: 'q16',
                  operator: ConditionalOperator.EQUALS,
                  value: 'yes',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-5',
        title: 'Complex Multi-Condition Logic',
        questions: [
          {
            id: 'q18',
            type: QuestionType.DROPDOWN,
            label: 'What is your preferred work arrangement?',
            options: [
              { value: 'remote', label: 'Fully Remote' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'onsite', label: 'On-site' },
            ],
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please select a work arrangement',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q19',
            type: QuestionType.YES_NO,
            label: 'Do you have a dedicated home office?',
            helpText: 'Only shown for Remote or Hybrid workers (OR logic)',
            allowNA: false,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'remote',
                },
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'hybrid',
                },
              ],
              logic: 'OR',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q20',
            type: QuestionType.NUMBER,
            label: 'What is your daily commute time (minutes)?',
            helpText: 'Only shown for Hybrid or On-site workers (OR logic)',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'hybrid',
                },
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'onsite',
                },
              ],
              logic: 'OR',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q21',
            type: QuestionType.RATING,
            label: 'Rate your work-from-home setup',
            helpText: 'Only for remote workers with home office (AND logic: Remote work AND has home office)',
            maxRating: 5,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'remote',
                },
                {
                  questionId: 'q19',
                  operator: ConditionalOperator.EQUALS,
                  value: 'yes',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q22',
            type: QuestionType.PHOTO,
            label: 'Upload a photo of your home office',
            helpText: 'Share your workspace setup (AND logic: Remote AND has office AND good rating)',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q18',
                  operator: ConditionalOperator.EQUALS,
                  value: 'remote',
                },
                {
                  questionId: 'q19',
                  operator: ConditionalOperator.EQUALS,
                  value: 'yes',
                },
                {
                  questionId: 'q21',
                  operator: ConditionalOperator.GREATER_THAN,
                  value: '3',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-6',
        title: 'Nested Conditional Logic',
        questions: [
          {
            id: 'q23',
            type: QuestionType.MULTIPLE_CHOICE,
            label: 'What is your primary industry?',
            options: [
              { value: 'tech', label: 'Technology' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'finance', label: 'Finance' },
              { value: 'education', label: 'Education' },
              { value: 'retail', label: 'Retail' },
              { value: 'other', label: 'Other' },
            ],
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please select your industry',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q24',
            type: QuestionType.CHECKBOXES,
            label: 'What technologies do you use? (Tech Industry)',
            helpText: 'Only shown if industry is Technology',
            options: [
              { value: 'cloud', label: 'Cloud Services (AWS/Azure/GCP)' },
              { value: 'ai', label: 'AI/Machine Learning' },
              { value: 'blockchain', label: 'Blockchain' },
              { value: 'iot', label: 'IoT' },
              { value: 'mobile', label: 'Mobile Development' },
            ],
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q23',
                  operator: ConditionalOperator.EQUALS,
                  value: 'tech',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q25',
            type: QuestionType.TEXT,
            label: 'Which AI/ML framework do you use?',
            helpText: 'Nested condition: Tech industry AND uses AI (CONTAINS)',
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q23',
                  operator: ConditionalOperator.EQUALS,
                  value: 'tech',
                },
                {
                  questionId: 'q24',
                  operator: ConditionalOperator.CONTAINS,
                  value: 'ai',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q26',
            type: QuestionType.TEXTAREA,
            label: 'What healthcare systems do you work with?',
            helpText: 'Only shown if industry is Healthcare',
            multiline: true,
            validations: [],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q23',
                  operator: ConditionalOperator.EQUALS,
                  value: 'healthcare',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
          {
            id: 'q27',
            type: QuestionType.TEXT,
            label: 'Please specify your industry',
            helpText: 'Only shown if "Other" is selected',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please specify your industry',
              },
            ],
            conditionalLogic: {
              enabled: true,
              conditions: [
                {
                  questionId: 'q23',
                  operator: ConditionalOperator.EQUALS,
                  value: 'other',
                },
              ],
              logic: 'AND',
            },
            scoring: { enabled: false },
          },
        ],
      },
      {
        id: 'section-7',
        title: 'Final Summary',
        questions: [
          {
            id: 'q28',
            type: QuestionType.RATING,
            label: 'How would you rate this conditional logic demo?',
            maxRating: 5,
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Please provide a rating',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q29',
            type: QuestionType.TEXTAREA,
            label: 'Share your feedback or suggestions',
            helpText: 'What did you think about the conditional logic features?',
            multiline: true,
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
          {
            id: 'q30',
            type: QuestionType.SIGNATURE,
            label: 'Sign to complete the demo',
            validations: [
              {
                rule: ValidationRule.REQUIRED,
                message: 'Signature is required to complete',
              },
            ],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false },
          },
        ],
      },
    ],
  },
];

export const loadSampleTemplates = (createTemplate) => {
  sampleTemplates.forEach((template) => {
    createTemplate(template);
  });
};
