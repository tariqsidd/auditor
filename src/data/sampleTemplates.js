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
];

export const loadSampleTemplates = (createTemplate) => {
  sampleTemplates.forEach((template) => {
    createTemplate(template);
  });
};
