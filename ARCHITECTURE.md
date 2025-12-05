# Architecture Documentation

## System Overview

The Dynamic Questionnaire App is a client-side React application built with modern web technologies. It follows a component-based architecture with centralized state management.

## Technology Stack

### Core Framework
- **React 19.1.0**: UI library with hooks and functional components
- **Vite 7.0.4**: Build tool and development server
- **React Router 7.10.1**: Client-side routing

### UI Framework
- **Material-UI 7.3.6**: Component library
- **Emotion**: CSS-in-JS styling
- **Lucide React**: Icon library

### State Management
- **Zustand 5.0.9**: Lightweight state management
- **Zustand Persist Middleware**: LocalStorage persistence

### Form & Interaction
- **@dnd-kit**: Drag-and-drop functionality
- **React Hook Form**: Form validation (available)
- **date-fns**: Date manipulation

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   React Application                    │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │  Navigation  │  │   Routing    │  │   Theme    │  │  │
│  │  │  (AppBar)    │  │ (React Router)│  │  (MUI)     │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                    Pages                         │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │  │  │
│  │  │  │Dashboard │ │Templates │ │   Responses     │  │  │  │
│  │  │  └──────────┘ └──────────┘ └─────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                 Components                       │  │  │
│  │  │  ┌──────────────┐  ┌──────────────────────────┐ │  │  │
│  │  │  │ Form Builder │  │   Question Types (11)    │ │  │  │
│  │  │  │  - Editor    │  │  - Text, Choice, Media   │ │  │  │
│  │  │  │  - DnD       │  │  - Signature, Rating     │ │  │  │
│  │  │  └──────────────┘  └──────────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              State Management (Zustand)          │  │  │
│  │  │  ┌──────────────────┐  ┌───────────────────┐   │  │  │
│  │  │  │ Template Store   │  │   Form Store      │   │  │  │
│  │  │  │  - CRUD ops      │  │  - Responses      │   │  │  │
│  │  │  │  - Search        │  │  - Answers        │   │  │  │
│  │  │  │  - Versioning    │  │  - Scoring        │   │  │  │
│  │  │  └──────────────────┘  └───────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                  Utilities                       │  │  │
│  │  │  ┌────────────┐ ┌────────────┐ ┌────────────┐  │  │  │
│  │  │  │Conditional │ │ Validation │ │  Scoring   │  │  │  │
│  │  │  │   Logic    │ │   Engine   │ │  Engine    │  │  │  │
│  │  │  └────────────┘ └────────────┘ └────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   LocalStorage                         │  │
│  │  ┌──────────────────┐  ┌──────────────────────────┐   │  │
│  │  │ template-storage │  │     form-storage         │   │  │
│  │  │  (Templates)     │  │     (Responses)          │   │  │
│  │  └──────────────────┘  └──────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Template Creation Flow
```
User Input → Form Builder → Template Store → LocalStorage
                ↓
         Question Editor
                ↓
    Validation/Conditional/Scoring Config
```

### Form Filling Flow
```
Template Store → Form Renderer → User Input → Form Store
                      ↓
              Conditional Logic Engine
                      ↓
              Validation Engine
                      ↓
              Scoring Engine
                      ↓
                LocalStorage
```

## Component Hierarchy

```
App
├── Navigation
└── Routes
    ├── Dashboard
    │   └── Stats Cards
    │   └── Quick Actions
    │
    ├── TemplateList
    │   ├── Search Bar
    │   ├── Template Cards
    │   └── Action Menu
    │
    ├── FormBuilder
    │   ├── Template Info Form
    │   ├── Section Container
    │   │   ├── DndContext
    │   │   └── Question Editors
    │   │       ├── Question Config
    │   │       ├── Options Editor
    │   │       ├── Validation Editor
    │   │       ├── Conditional Logic Editor
    │   │       └── Scoring Editor
    │   └── Save/Cancel Actions
    │
    ├── FormRenderer
    │   ├── Progress Bar
    │   ├── Stepper
    │   ├── Section Display
    │   │   └── Question Components
    │   │       ├── TextQuestion
    │   │       ├── MultipleChoiceQuestion
    │   │       ├── CheckboxQuestion
    │   │       ├── DropdownQuestion
    │   │       ├── NumberQuestion
    │   │       ├── DateTimeQuestion
    │   │       ├── PhotoQuestion
    │   │       ├── FileUploadQuestion
    │   │       ├── SignatureQuestion
    │   │       ├── RatingQuestion
    │   │       └── YesNoQuestion
    │   └── Navigation Actions
    │
    └── ResponseList
        ├── Search Bar
        ├── Response Table
        └── Action Menu
```

## State Management

### Template Store (`templateStore.js`)

**State:**
```javascript
{
  templates: [],
  currentTemplate: null
}
```

**Actions:**
- `createTemplate(template)`: Create new template
- `updateTemplate(id, updates)`: Update existing template
- `deleteTemplate(id)`: Delete template
- `duplicateTemplate(id)`: Duplicate template
- `setCurrentTemplate(template)`: Set active template
- `getTemplateById(id)`: Retrieve template
- `getTemplatesByCategory(category)`: Filter by category
- `searchTemplates(query)`: Search templates

### Form Store (`formStore.js`)

**State:**
```javascript
{
  responses: [],
  currentResponse: null
}
```

**Actions:**
- `createResponse(templateId)`: Start new response
- `updateResponse(id, updates)`: Update response
- `setAnswer(responseId, questionId, answer)`: Save answer
- `completeResponse(id, score)`: Mark as completed
- `deleteResponse(id)`: Delete response
- `getResponseById(id)`: Retrieve response
- `getResponsesByTemplate(templateId)`: Filter by template

## Utility Modules

### Conditional Logic Engine (`conditionalLogic.js`)

**Functions:**
- `evaluateCondition(condition, answers)`: Check if condition is met
- `shouldShowQuestion(question, answers)`: Determine visibility
- `getVisibleQuestions(questions, answers)`: Filter visible questions

**Operators:**
- Equals, Not Equals
- Contains
- Greater Than, Less Than
- Is Empty, Is Not Empty

### Validation Engine (`validation.js`)

**Functions:**
- `validateField(value, validations)`: Validate single field
- `validateForm(questions, answers)`: Validate entire form

**Rules:**
- Required
- Min/Max Length
- Min/Max Value
- Pattern (regex)
- Email, URL, Phone

### Scoring Engine (`scoring.js`)

**Functions:**
- `calculateQuestionScore(question, answer)`: Score single question
- `calculateTotalScore(template, answers)`: Calculate total score
- `getScoreCategory(percentage)`: Get score category

**Scoring Types:**
- Binary (correct/incorrect)
- Weighted (different points per answer)
- Partial (partial credit)
- Range (numeric value as score)

## Routing Structure

```
/                           → Dashboard
/templates                  → Template List
/templates/new              → Create Template
/templates/edit/:templateId → Edit Template
/forms                      → Response List
/forms/new/:templateId      → Fill Form
/forms/view/:responseId     → View Response
```

## Data Models

### Template Model
```javascript
{
  id: string,
  name: string,
  description: string,
  category: string,
  tags: string[],
  version: number,
  createdAt: ISO8601,
  updatedAt: ISO8601,
  revisionHistory: object[],
  sections: Section[]
}
```

### Section Model
```javascript
{
  id: string,
  title: string,
  questions: Question[]
}
```

### Question Model
```javascript
{
  id: string,
  type: QuestionType,
  label: string,
  helpText: string,
  options: Option[],           // for choice questions
  validations: Validation[],
  conditionalLogic: ConditionalLogic,
  scoring: Scoring
}
```

### Response Model
```javascript
{
  id: string,
  templateId: string,
  answers: { [questionId]: any },
  status: 'in_progress' | 'draft' | 'completed',
  createdAt: ISO8601,
  updatedAt: ISO8601,
  completedAt: ISO8601,
  score: ScoreResult
}
```

## Performance Considerations

### Optimizations
1. **Component Memoization**: Use React.memo for expensive components
2. **Lazy Loading**: Code splitting for routes (future)
3. **Virtual Scrolling**: For large lists (future)
4. **Debounced Search**: Reduce search operations
5. **LocalStorage Batching**: Minimize storage writes

### Current Limitations
- All data in memory (localStorage)
- No pagination (suitable for < 1000 templates)
- No server-side persistence
- No real-time collaboration

## Security Considerations

### Current Implementation
- Client-side only (no server)
- LocalStorage persistence
- No authentication/authorization
- No data encryption

### Future Enhancements
- Backend API integration
- User authentication
- Data encryption at rest
- Role-based access control
- Audit logging

## Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- ES6+ JavaScript
- LocalStorage API
- Canvas API (for signatures)
- File API (for uploads)

## Build & Deployment

### Development
```bash
yarn dev
```
- Vite dev server with HMR
- Port: 5173 (default)
- Source maps enabled

### Production
```bash
yarn build
```
- Minified bundle
- Tree-shaking
- Code splitting
- Output: `dist/` directory

### Deployment Options
- Static hosting (Netlify, Vercel, GitHub Pages)
- CDN distribution
- Docker container
- Traditional web server (nginx, Apache)

## Future Architecture Considerations

### Backend Integration
```
React App → REST API → Database
                ↓
         Authentication
                ↓
         File Storage (S3)
```

### Real-time Features
```
React App → WebSocket → Server → Database
                ↓
         Broadcast Updates
```

### Microservices (Advanced)
```
┌─────────────┐
│  React App  │
└──────┬──────┘
       │
   ┌───┴────┐
   │ API GW │
   └───┬────┘
       │
   ┌───┴────────────────────┐
   │                        │
┌──┴──────┐         ┌───────┴────┐
│Template │         │  Response  │
│Service  │         │  Service   │
└─────────┘         └────────────┘
```

## Monitoring & Analytics (Future)

- Error tracking (Sentry)
- Usage analytics (Google Analytics)
- Performance monitoring (Web Vitals)
- User behavior tracking
- A/B testing framework
