# Dynamic Questionnaire App (iAuditor Clone)

A comprehensive questionnaire management system similar to SafetyCulture iAuditor, built with React, Material-UI, and modern state management.

## Features

### 🎯 Core Capabilities
- **Template Management**: Create, edit, duplicate, and organize custom inspection/audit templates
- **Dynamic Form Builder**: Drag-and-drop interface with 11+ question types
- **Conditional Logic**: Show/hide questions based on previous answers
- **Validation System**: Comprehensive field validation with custom rules
- **Scoring Engine**: Automatic scoring with weighted points and categories
- **Response Management**: Track, view, and manage form submissions

### 📝 Question Types
- Text (single & multi-line)
- Multiple Choice
- Checkboxes
- Dropdown
- Number
- Date/Time/DateTime
- Signature Capture
- Photo Upload
- File Upload
- Rating (Stars)
- Yes/No/N/A

### 🎨 User Experience
- Modern, responsive Material-UI design
- Mobile-friendly interface
- Real-time validation feedback
- Multi-step form navigation
- Progress tracking
- Draft saving

## Quick Start

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

### Preview Production Build
```bash
yarn preview
```

## Project Structure

```
src/
├── components/
│   ├── QuestionTypes/      # Question type components
│   ├── FormBuilder/        # Template builder UI
│   └── Layout/             # Navigation & layout
├── pages/                  # Main application pages
├── store/                  # Zustand state management
├── types/                  # Type definitions
└── utils/                  # Utility functions
```

## Key Technologies

- **React 19.1.0** - UI framework
- **Material-UI 7.3.6** - Component library
- **React Router 7.10.1** - Routing
- **Zustand 5.0.9** - State management
- **@dnd-kit** - Drag and drop
- **date-fns 4.1.0** - Date utilities
- **Lucide React** - Icons

## Documentation

See [FEATURES.md](./FEATURES.md) for detailed feature documentation and user flows.

## License

MIT

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
