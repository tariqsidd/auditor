# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

## Installation & Setup

### 1. Install Dependencies
```bash
yarn install
```

### 2. Start Development Server
```bash
yarn dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production
```bash
yarn build
```

### 4. Preview Production Build
```bash
yarn preview
```

## First Steps

### Option 1: Create Your First Template
1. Open the app in your browser
2. Click **"Templates"** in the navigation
3. Click **"Create Template"**
4. Fill in template details
5. Add questions using the form builder
6. Save your template

### Option 2: Load Sample Templates (Coming Soon)
Sample templates are available in `src/data/sampleTemplates.js` for reference.

## Application Structure

```
my-react-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── QuestionTypes/   # 11 question type components
│   │   ├── FormBuilder/     # Template builder UI
│   │   └── Layout/          # Navigation
│   ├── pages/               # Main pages
│   │   ├── Dashboard.jsx    # Home page
│   │   ├── TemplateList.jsx # Template management
│   │   ├── FormRenderer.jsx # Form filling
│   │   └── ResponseList.jsx # Response management
│   ├── store/               # State management
│   │   ├── templateStore.js # Template CRUD
│   │   └── formStore.js     # Response management
│   ├── utils/               # Utility functions
│   │   ├── conditionalLogic.js
│   │   ├── validation.js
│   │   └── scoring.js
│   ├── types/               # Type definitions
│   └── data/                # Sample data
├── FEATURES.md              # Detailed feature docs
├── USER_GUIDE.md            # User documentation
└── README.md                # Project overview
```

## Key Features to Try

### 1. Template Builder
- Drag-and-drop question reordering
- 11+ question types
- Conditional logic (show/hide questions)
- Validation rules
- Scoring system

### 2. Form Filling
- Multi-step forms
- Real-time validation
- Draft saving
- Progress tracking

### 3. Response Management
- View all submissions
- Search and filter
- Score tracking

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or specify a different port
yarn dev --port 3000
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors
```bash
# Check for ESLint errors
yarn lint

# Clean build
rm -rf dist
yarn build
```

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Internet Explorer is not supported.

## Data Storage
- All data is stored in browser's localStorage
- No backend required
- Data persists across sessions
- Clear browser data to reset

## Next Steps
1. Read the [User Guide](./USER_GUIDE.md) for detailed instructions
2. Check [FEATURES.md](./FEATURES.md) for complete feature list
3. Explore sample templates in `src/data/sampleTemplates.js`

## Development Tips

### Hot Module Replacement (HMR)
- Changes to `.jsx` files reload automatically
- State is preserved during HMR
- Check console for any errors

### State Persistence
- Templates and responses persist in localStorage
- Key: `template-storage` and `form-storage`
- Clear storage: Open DevTools → Application → Local Storage → Clear

### Debugging
- Open browser DevTools (F12)
- Check Console for errors
- Use React DevTools extension for component inspection

## Common Commands

```bash
# Development
yarn dev              # Start dev server

# Building
yarn build            # Production build
yarn preview          # Preview production build

# Code Quality
yarn lint             # Run ESLint

# Dependencies
yarn add <package>    # Add dependency
yarn remove <package> # Remove dependency
```

## Support
For issues or questions, refer to:
- [User Guide](./USER_GUIDE.md)
- [Features Documentation](./FEATURES.md)
- Browser console for error messages
