# Dynamic Questionnaire App - Feature Documentation

## Overview
A comprehensive questionnaire management system similar to SafetyCulture iAuditor, built with React, Material-UI, and modern state management.

## Core Features Implemented

### 1. Template Management

#### Create Custom Templates
- **Drag-and-drop form builder** with intuitive interface
- **Multiple question types** supported:
  - Text (single-line and multi-line)
  - Multiple Choice (radio buttons)
  - Checkboxes (multi-select)
  - Dropdown (select menus)
  - Number (with min/max validation)
  - Date/Time/DateTime pickers
  - Signature capture (canvas-based)
  - Photo capture (image upload)
  - File upload (multiple files)
  - Rating (star rating)
  - Yes/No/N/A questions

#### Template Organization
- **Categories and Tags**: Organize templates by category and add custom tags
- **Template Search**: Full-text search across template names, descriptions, and tags
- **Template Versioning**: Automatic version tracking with revision history
- **Template Actions**:
  - Create new templates
  - Edit existing templates
  - Duplicate templates
  - Delete templates
  - View template details

### 2. Dynamic Form Builder

#### Visual Question Editor
- **Question Configuration**:
  - Question label and help text
  - Question type selection
  - Required/optional field settings
  - Custom placeholder text

#### Advanced Question Settings
- **Options Management** (for choice-based questions):
  - Add/remove options dynamically
  - Custom value and label for each option
  
- **Validation Rules**:
  - Required field validation
  - Min/max length validation
  - Min/max value validation
  - Pattern matching (regex)
  - Email validation
  - URL validation
  - Phone number validation
  - Custom error messages

#### Conditional Logic Engine
- **Show/Hide Questions** based on previous answers
- **Multiple Conditions** with AND/OR logic
- **Supported Operators**:
  - Equals
  - Not Equals
  - Contains
  - Greater Than
  - Less Than
  - Is Empty
  - Is Not Empty

#### Scoring System
- **Question Scoring**:
  - Enable/disable scoring per question
  - Assign point values
  - Binary scoring (correct/incorrect)
  - Weighted scoring
  - Partial credit scoring
  
- **Form Scoring**:
  - Automatic total score calculation
  - Maximum score tracking
  - Percentage calculation
  - Score categories (Excellent, Good, Satisfactory, etc.)

#### Section Management
- **Multi-section Forms**: Organize questions into logical sections
- **Section Navigation**: Step-by-step form completion
- **Progress Tracking**: Visual progress indicator

### 3. Form Rendering & Response Collection

#### Dynamic Form Display
- **Conditional Rendering**: Questions appear/hide based on logic rules
- **Real-time Validation**: Immediate feedback on input errors
- **Multi-step Forms**: Section-based navigation with stepper
- **Progress Indicator**: Linear progress bar showing completion

#### Response Management
- **Draft Saving**: Save incomplete forms as drafts
- **Response Submission**: Complete and submit forms
- **Response Tracking**:
  - Creation date
  - Completion date
  - Status (in progress, draft, completed)
  - Score results

#### Data Persistence
- **Local Storage**: Automatic persistence using Zustand middleware
- **State Management**: Centralized state with Zustand stores
- **Data Recovery**: Responses persist across browser sessions

### 4. User Interface

#### Modern Design
- **Material-UI Components**: Professional, accessible UI components
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Lucide Icons**: Clean, modern iconography
- **Theme Support**: Customizable color scheme

#### Navigation
- **App Bar Navigation**: Easy access to main sections
- **Mobile Drawer**: Responsive mobile navigation
- **Breadcrumb Navigation**: Clear location awareness

#### Dashboard
- **Statistics Overview**: Quick view of templates and responses
- **Quick Actions**: Fast access to common tasks
- **Visual Cards**: Attractive data presentation

## User Flow

### Creating a Template
1. Navigate to Templates page
2. Click "Create Template"
3. Enter template details (name, description, category, tags)
4. Add questions using the form builder
5. Configure question types and options
6. Set up validation rules (optional)
7. Add conditional logic (optional)
8. Enable scoring (optional)
9. Save template

### Using a Template
1. Navigate to Templates page
2. Find desired template
3. Click "Use Template"
4. Fill out the form section by section
5. Save as draft or submit when complete
6. View score results (if scoring enabled)

### Managing Responses
1. Navigate to Responses page
2. View all submitted forms
3. Filter/search responses
4. View individual response details
5. Delete responses if needed

## Technical Architecture

### State Management
- **Zustand Stores**:
  - `templateStore`: Template CRUD operations
  - `formStore`: Response management
  
### Routing
- **React Router**: Client-side routing
- **Protected Routes**: Template and form access control

### Form Logic
- **Conditional Logic Engine**: `utils/conditionalLogic.js`
- **Validation System**: `utils/validation.js`
- **Scoring Calculator**: `utils/scoring.js`

### Component Structure
```
src/
├── components/
│   ├── QuestionTypes/        # Individual question components
│   ├── FormBuilder/           # Template builder components
│   └── Layout/                # Navigation and layout
├── pages/                     # Main page components
├── store/                     # Zustand state stores
├── types/                     # Type definitions
└── utils/                     # Utility functions
```

## Future Enhancements

### Potential Features
- **Export/Import**: JSON export/import for templates
- **Template Library**: Pre-built industry templates
- **Collaboration**: Multi-user template editing
- **Analytics**: Response analytics and reporting
- **PDF Export**: Generate PDF reports from responses
- **Email Notifications**: Automated response notifications
- **Media Library**: Centralized photo/file management
- **Offline Support**: Progressive Web App capabilities
- **API Integration**: Backend API for data persistence
- **Role-based Access**: User permissions and roles

## Getting Started

### Installation
```bash
yarn install
```

### Development
```bash
yarn dev
```

### Build
```bash
yarn build
```

## Dependencies

### Core
- React 19.1.0
- React Router DOM 7.10.1
- Material-UI 7.3.6

### State Management
- Zustand 5.0.9

### Form & DnD
- React Hook Form 7.68.0
- @dnd-kit/core 6.3.1
- @dnd-kit/sortable 10.0.0

### Utilities
- date-fns 4.1.0
- lucide-react 0.556.0
