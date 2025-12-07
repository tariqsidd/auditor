import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sampleTemplates } from '../data/sampleTemplates';

const dummyTemplates = [
  {
    id: 'template-covid-screening',
    name: 'COVID-19 Health Screening',
    description: 'Daily health screening questionnaire for employees and visitors to ensure workplace safety.',
    category: 'Health & Safety',
    tags: ['covid', 'health', 'screening', 'workplace'],
    createdAt: '2024-01-15T09:00:00.000Z',
    updatedAt: '2024-01-15T09:00:00.000Z',
    version: 1,
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Personal Information',
        questions: [
          {
            id: 'q1',
            type: 'text',
            label: 'Full Name',
            helpText: 'Enter your full legal name',
            validations: [{ rule: 'required', message: 'Name is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q2',
            type: 'text',
            label: 'Department / Company',
            helpText: '',
            validations: [{ rule: 'required', message: 'Department is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q3',
            type: 'date',
            label: 'Date of Visit',
            helpText: '',
            validations: [{ rule: 'required', message: 'Date is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Health Symptoms',
        questions: [
          {
            id: 'q4',
            type: 'yes_no',
            label: 'Do you have a fever (temperature above 37.5°C / 99.5°F)?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 10 },
          },
          {
            id: 'q5',
            type: 'yes_no',
            label: 'Do you have a cough, sore throat, or difficulty breathing?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 10 },
          },
          {
            id: 'q6',
            type: 'yes_no',
            label: 'Have you experienced loss of taste or smell?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 10 },
          },
          {
            id: 'q7',
            type: 'yes_no',
            label: 'Have you been in close contact with anyone who tested positive for COVID-19 in the last 14 days?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 10 },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Declaration',
        questions: [
          {
            id: 'q8',
            type: 'checkboxes',
            label: 'I confirm that:',
            helpText: '',
            options: [
              { value: 'accurate', label: 'All information provided is accurate and complete' },
              { value: 'notify', label: 'I will notify management if my health status changes' },
              { value: 'guidelines', label: 'I agree to follow all safety guidelines' },
            ],
            validations: [{ rule: 'required', message: 'Please confirm all statements' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q9',
            type: 'signature',
            label: 'Signature',
            helpText: 'Please sign to confirm your declaration',
            validations: [{ rule: 'required', message: 'Signature is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'template-safety-inspection',
    name: 'Workplace Safety Inspection',
    description: 'Comprehensive safety inspection checklist for workplace hazard identification and compliance.',
    category: 'Health & Safety',
    tags: ['safety', 'inspection', 'workplace', 'compliance'],
    createdAt: '2024-01-10T09:00:00.000Z',
    updatedAt: '2024-01-10T09:00:00.000Z',
    version: 1,
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'General Information',
        questions: [
          {
            id: 'q1',
            type: 'text',
            label: 'Inspector Name',
            helpText: '',
            validations: [{ rule: 'required', message: 'Inspector name is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q2',
            type: 'text',
            label: 'Location / Area',
            helpText: 'Specify the area being inspected',
            validations: [{ rule: 'required', message: 'Location is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q3',
            type: 'datetime',
            label: 'Inspection Date & Time',
            helpText: '',
            validations: [{ rule: 'required', message: 'Date and time is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Fire Safety',
        questions: [
          {
            id: 'q4',
            type: 'multiple_choice',
            label: 'Are fire extinguishers accessible and properly maintained?',
            helpText: '',
            options: [
              { value: 'compliant', label: 'Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'na', label: 'Not Applicable' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q5',
            type: 'multiple_choice',
            label: 'Are emergency exits clearly marked and unobstructed?',
            helpText: '',
            options: [
              { value: 'compliant', label: 'Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'na', label: 'Not Applicable' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q6',
            type: 'multiple_choice',
            label: 'Is the fire alarm system functional?',
            helpText: '',
            options: [
              { value: 'compliant', label: 'Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'na', label: 'Not Applicable' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q7',
            type: 'textarea',
            label: 'Fire Safety Notes',
            helpText: 'Document any issues or observations',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Electrical Safety',
        questions: [
          {
            id: 'q8',
            type: 'multiple_choice',
            label: 'Are electrical panels accessible and properly labeled?',
            helpText: '',
            options: [
              { value: 'compliant', label: 'Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'na', label: 'Not Applicable' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q9',
            type: 'multiple_choice',
            label: 'Are cords and cables in good condition (no fraying or damage)?',
            helpText: '',
            options: [
              { value: 'compliant', label: 'Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'na', label: 'Not Applicable' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q10',
            type: 'photo',
            label: 'Photo Evidence',
            helpText: 'Take photos of any electrical hazards found',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-4',
        title: 'Summary',
        questions: [
          {
            id: 'q11',
            type: 'rating',
            label: 'Overall Safety Rating',
            helpText: 'Rate the overall safety condition of the area',
            validations: [{ rule: 'required', message: 'Please provide a rating' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q12',
            type: 'textarea',
            label: 'Recommendations',
            helpText: 'List any corrective actions needed',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q13',
            type: 'signature',
            label: 'Inspector Signature',
            helpText: '',
            validations: [{ rule: 'required', message: 'Signature is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'template-customer-feedback',
    name: 'Customer Satisfaction Survey',
    description: 'Gather valuable feedback from customers about their experience with your products or services.',
    category: 'Customer Service',
    tags: ['feedback', 'customer', 'survey', 'satisfaction'],
    createdAt: '2024-01-08T09:00:00.000Z',
    updatedAt: '2024-01-08T09:00:00.000Z',
    version: 1,
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Overall Experience',
        questions: [
          {
            id: 'q1',
            type: 'rating',
            label: 'How would you rate your overall experience?',
            helpText: '1 = Very Poor, 5 = Excellent',
            validations: [{ rule: 'required', message: 'Please provide a rating' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            label: 'How likely are you to recommend us to others?',
            helpText: '',
            options: [
              { value: 'very_likely', label: 'Very Likely' },
              { value: 'likely', label: 'Likely' },
              { value: 'neutral', label: 'Neutral' },
              { value: 'unlikely', label: 'Unlikely' },
              { value: 'very_unlikely', label: 'Very Unlikely' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Service Quality',
        questions: [
          {
            id: 'q3',
            type: 'rating',
            label: 'How would you rate the quality of our product/service?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please provide a rating' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q4',
            type: 'rating',
            label: 'How would you rate the responsiveness of our team?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please provide a rating' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q5',
            type: 'rating',
            label: 'How would you rate the value for money?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please provide a rating' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Feedback',
        questions: [
          {
            id: 'q6',
            type: 'textarea',
            label: 'What did you like most about your experience?',
            helpText: '',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q7',
            type: 'textarea',
            label: 'What could we improve?',
            helpText: '',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q8',
            type: 'yes_no',
            label: 'May we contact you for follow-up?',
            helpText: '',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q9',
            type: 'text',
            label: 'Email Address',
            helpText: 'Optional - only if you agreed to follow-up',
            validations: [{ rule: 'email', message: 'Please enter a valid email' }],
            conditionalLogic: {
              enabled: true,
              conditions: [{ questionId: 'q8', operator: 'equals', value: 'yes' }],
              logic: 'AND',
            },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'template-vehicle-inspection',
    name: 'Vehicle Pre-Trip Inspection',
    description: 'Daily vehicle inspection checklist to ensure safe operation and compliance with regulations.',
    category: 'Transportation',
    tags: ['vehicle', 'inspection', 'fleet', 'transportation'],
    createdAt: '2024-01-05T09:00:00.000Z',
    updatedAt: '2024-01-05T09:00:00.000Z',
    version: 1,
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Vehicle Information',
        questions: [
          {
            id: 'q1',
            type: 'text',
            label: 'Driver Name',
            helpText: '',
            validations: [{ rule: 'required', message: 'Driver name is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q2',
            type: 'text',
            label: 'Vehicle ID / License Plate',
            helpText: '',
            validations: [{ rule: 'required', message: 'Vehicle ID is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q3',
            type: 'number',
            label: 'Current Odometer Reading',
            helpText: 'Enter in kilometers or miles',
            validations: [{ rule: 'required', message: 'Odometer reading is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q4',
            type: 'date',
            label: 'Inspection Date',
            helpText: '',
            validations: [{ rule: 'required', message: 'Date is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Exterior Inspection',
        questions: [
          {
            id: 'q5',
            type: 'multiple_choice',
            label: 'Tires - Condition and pressure',
            helpText: 'Check all tires including spare',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q6',
            type: 'multiple_choice',
            label: 'Lights - Headlights, brake lights, turn signals',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q7',
            type: 'multiple_choice',
            label: 'Mirrors - Clean and properly adjusted',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q8',
            type: 'multiple_choice',
            label: 'Body - No visible damage or leaks',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Interior & Safety',
        questions: [
          {
            id: 'q9',
            type: 'multiple_choice',
            label: 'Seatbelts - Functional',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q10',
            type: 'multiple_choice',
            label: 'Horn - Working',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q11',
            type: 'multiple_choice',
            label: 'Brakes - Responsive',
            helpText: '',
            options: [
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ],
            validations: [{ rule: 'required', message: 'Please select an option' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
          {
            id: 'q12',
            type: 'yes_no',
            label: 'Is the first aid kit present and stocked?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: true, points: 5 },
          },
        ],
      },
      {
        id: 'section-4',
        title: 'Sign Off',
        questions: [
          {
            id: 'q13',
            type: 'yes_no',
            label: 'Is this vehicle safe to operate?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please confirm' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q14',
            type: 'textarea',
            label: 'Additional Notes / Issues Found',
            helpText: 'Document any defects or concerns',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q15',
            type: 'photo',
            label: 'Photo of Issues (if any)',
            helpText: '',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q16',
            type: 'signature',
            label: 'Driver Signature',
            helpText: '',
            validations: [{ rule: 'required', message: 'Signature is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'template-employee-onboarding',
    name: 'Employee Onboarding Checklist',
    description: 'Comprehensive checklist to ensure new employees complete all onboarding requirements.',
    category: 'Human Resources',
    tags: ['hr', 'onboarding', 'employee', 'checklist'],
    createdAt: '2024-01-01T09:00:00.000Z',
    updatedAt: '2024-01-01T09:00:00.000Z',
    version: 1,
    revisionHistory: [],
    sections: [
      {
        id: 'section-1',
        title: 'Employee Details',
        questions: [
          {
            id: 'q1',
            type: 'text',
            label: 'Employee Full Name',
            helpText: '',
            validations: [{ rule: 'required', message: 'Name is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q2',
            type: 'text',
            label: 'Job Title',
            helpText: '',
            validations: [{ rule: 'required', message: 'Job title is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q3',
            type: 'text',
            label: 'Department',
            helpText: '',
            validations: [{ rule: 'required', message: 'Department is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q4',
            type: 'date',
            label: 'Start Date',
            helpText: '',
            validations: [{ rule: 'required', message: 'Start date is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q5',
            type: 'text',
            label: 'Manager Name',
            helpText: '',
            validations: [{ rule: 'required', message: 'Manager name is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Documentation',
        questions: [
          {
            id: 'q6',
            type: 'checkboxes',
            label: 'Required documents submitted:',
            helpText: '',
            options: [
              { value: 'id', label: 'Government-issued ID' },
              { value: 'tax', label: 'Tax forms completed' },
              { value: 'bank', label: 'Bank details for payroll' },
              { value: 'emergency', label: 'Emergency contact information' },
              { value: 'contract', label: 'Signed employment contract' },
            ],
            validations: [{ rule: 'required', message: 'Please check completed items' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-3',
        title: 'IT & Access Setup',
        questions: [
          {
            id: 'q7',
            type: 'checkboxes',
            label: 'IT setup completed:',
            helpText: '',
            options: [
              { value: 'email', label: 'Email account created' },
              { value: 'laptop', label: 'Laptop/computer assigned' },
              { value: 'software', label: 'Required software installed' },
              { value: 'access', label: 'System access granted' },
              { value: 'badge', label: 'Access badge issued' },
            ],
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-4',
        title: 'Training & Orientation',
        questions: [
          {
            id: 'q8',
            type: 'checkboxes',
            label: 'Training completed:',
            helpText: '',
            options: [
              { value: 'orientation', label: 'Company orientation' },
              { value: 'safety', label: 'Safety training' },
              { value: 'harassment', label: 'Anti-harassment training' },
              { value: 'security', label: 'Data security training' },
              { value: 'role', label: 'Role-specific training' },
            ],
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q9',
            type: 'yes_no',
            label: 'Has the employee been introduced to their team?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q10',
            type: 'yes_no',
            label: 'Has a 30/60/90 day plan been discussed?',
            helpText: '',
            validations: [{ rule: 'required', message: 'Please answer this question' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
      {
        id: 'section-5',
        title: 'Acknowledgment',
        questions: [
          {
            id: 'q11',
            type: 'textarea',
            label: 'Additional Notes',
            helpText: 'Any special accommodations or notes',
            validations: [],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q12',
            type: 'signature',
            label: 'HR Representative Signature',
            helpText: '',
            validations: [{ rule: 'required', message: 'Signature is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
          {
            id: 'q13',
            type: 'signature',
            label: 'Employee Signature',
            helpText: '',
            validations: [{ rule: 'required', message: 'Signature is required' }],
            conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
            scoring: { enabled: false, points: 0 },
          },
        ],
      },
    ],
  },
];

// Combine all initial templates
const getAllInitialTemplates = () => [...dummyTemplates, ...sampleTemplates];

const useTemplateStore = create(
  persist(
    (set, get) => ({
      templates: getAllInitialTemplates(),
      currentTemplate: null,
      _hasHydrated: false,
      
      createTemplate: (template) => {
        const newTemplate = {
          ...template,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          revisionHistory: [],
        };
        set((state) => ({
          templates: [...state.templates, newTemplate],
        }));
        return newTemplate;
      },

      updateTemplate: (id, updates) => {
        set((state) => {
          const template = state.templates.find((t) => t.id === id);
          if (!template) return state;

          const updatedTemplate = {
            ...template,
            ...updates,
            updatedAt: new Date().toISOString(),
            revisionHistory: [
              ...(template.revisionHistory || []),
              {
                version: template.version,
                updatedAt: template.updatedAt,
                changes: updates,
              },
            ],
            version: template.version + 1,
          };

          return {
            templates: state.templates.map((t) =>
              t.id === id ? updatedTemplate : t
            ),
          };
        });
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        }));
      },

      duplicateTemplate: (id) => {
        const template = get().templates.find((t) => t.id === id);
        if (!template) return;

        const duplicated = {
          ...template,
          id: crypto.randomUUID(),
          name: `${template.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          revisionHistory: [],
        };

        set((state) => ({
          templates: [...state.templates, duplicated],
        }));
        return duplicated;
      },

      setCurrentTemplate: (template) => {
        set({ currentTemplate: template });
      },

      getTemplateById: (id) => {
        return get().templates.find((t) => t.id === id);
      },

      getTemplatesByCategory: (category) => {
        return get().templates.filter((t) => t.category === category);
      },

      searchTemplates: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().templates.filter(
          (t) =>
            t.name.toLowerCase().includes(lowerQuery) ||
            t.description?.toLowerCase().includes(lowerQuery) ||
            t.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },

      // Sync sample templates - adds any missing sample templates
      syncSampleTemplates: () => {
        const currentTemplates = get().templates;
        const allSampleTemplates = getAllInitialTemplates();
        const currentIds = new Set(currentTemplates.map(t => t.id));
        const newTemplates = allSampleTemplates.filter(t => !currentIds.has(t.id));

        if (newTemplates.length > 0) {
          set((state) => ({
            templates: [...state.templates, ...newTemplates],
          }));
        }
      },
    }),
    {
      name: 'template-storage',
    }
  )
);

export default useTemplateStore;
