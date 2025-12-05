# User Guide - Dynamic Questionnaire App

## Table of Contents
1. [Getting Started](#getting-started)
2. [Creating Templates](#creating-templates)
3. [Using Templates](#using-templates)
4. [Managing Responses](#managing-responses)
5. [Advanced Features](#advanced-features)

---

## Getting Started

### First Launch
When you first open the application, you'll see the Dashboard with:
- Statistics showing your templates and responses
- Quick action cards for common tasks
- Navigation menu to access different sections

### Navigation
- **Dashboard**: Overview and quick actions
- **Templates**: Manage your questionnaire templates
- **Responses**: View and manage form submissions

---

## Creating Templates

### Step 1: Create a New Template
1. Click **"Templates"** in the navigation menu
2. Click **"Create Template"** button
3. Fill in template details:
   - **Name**: Give your template a descriptive name
   - **Description**: Add details about the template's purpose
   - **Category**: Organize by category (e.g., Safety, Survey, Audit)
   - **Tags**: Add searchable tags (press Enter after each tag)

### Step 2: Add Questions
1. Click **"Add Question"** in a section
2. Configure the question:
   - **Label**: The question text
   - **Type**: Select from 11+ question types
   - **Help Text**: Optional guidance for users

### Question Types Available

#### Text Input
- **Text**: Single-line text input
- **Textarea**: Multi-line text input

#### Choice Questions
- **Multiple Choice**: Radio buttons (single selection)
- **Checkboxes**: Multiple selections allowed
- **Dropdown**: Select menu with options
- **Yes/No**: Binary choice with optional N/A

#### Numeric & Date
- **Number**: Numeric input with min/max
- **Date**: Date picker
- **Time**: Time picker
- **DateTime**: Combined date and time

#### Media & Signatures
- **Photo**: Image upload/capture
- **File Upload**: Multiple file uploads
- **Signature**: Canvas-based signature capture

#### Rating
- **Rating**: Star rating (1-5 stars)

### Step 3: Configure Options (for choice questions)
1. Click **"Add Option"** for Multiple Choice, Checkboxes, or Dropdown
2. Set **Value** (internal identifier) and **Label** (display text)
3. Add as many options as needed
4. Remove options with the trash icon

### Step 4: Advanced Settings
Click the **"Advanced Settings"** accordion to access:

#### Validation Rules
Add validation to ensure data quality:
1. Click **"Add Validation"**
2. Select a **Rule**:
   - Required
   - Min/Max Length
   - Min/Max Value
   - Pattern (regex)
   - Email
   - URL
   - Phone
3. Set the **Value** (if applicable)
4. Add a custom **Error Message**

#### Conditional Logic
Show/hide questions based on previous answers:
1. Enable **"Conditional Logic"** toggle
2. Select **Logic Type**:
   - **AND**: All conditions must be true
   - **OR**: Any condition can be true
3. Click **"Add Condition"**
4. Configure:
   - **Question**: Which previous question to check
   - **Operator**: How to compare (equals, contains, etc.)
   - **Value**: What to compare against

**Example**: Show "Describe the issue" only if user answers "No" to "Is everything working?"

#### Scoring
Enable automatic scoring:
1. Enable **"Scoring"** toggle
2. Set **Points** for the question
3. Configure scoring type:
   - **Binary**: Correct/incorrect
   - **Weighted**: Different points per answer
   - **Range**: Use the numeric value as score

### Step 5: Organize with Drag & Drop
- Click and drag the **grip icon** (⋮⋮) to reorder questions
- Questions will reorder in real-time

### Step 6: Save Template
1. Click **"Save Template"** at the bottom
2. Your template is now available in the Templates list

---

## Using Templates

### Fill Out a Form
1. Go to **Templates** page
2. Find your template
3. Click **"Use Template"**
4. Fill out the form:
   - Answer each question
   - Required fields are marked with *
   - Validation errors appear in real-time
   - Some questions may appear/hide based on your answers

### Multi-Section Forms
- Use **"Next"** and **"Back"** buttons to navigate
- Progress bar shows completion status
- Stepper shows current section

### Save Draft
- Click **"Save Draft"** to save incomplete forms
- Resume later from the Responses page

### Submit Form
- Click **"Submit"** on the final section
- View your score (if scoring is enabled)
- Form is marked as completed

---

## Managing Responses

### View All Responses
1. Go to **Responses** page
2. See all submitted forms in a table:
   - Template name
   - Status (completed, in progress, draft)
   - Creation and completion dates
   - Score results

### Search Responses
- Use the search bar to filter by template name

### View Response Details
1. Click the **menu icon** (⋮) on a response
2. Select **"View"**
3. See all answers and scores

### Delete Responses
1. Click the **menu icon** (⋮)
2. Select **"Delete"**
3. Confirm deletion

---

## Advanced Features

### Template Versioning
- Every template save creates a new version
- Version history is automatically tracked
- View revision history in template details

### Template Actions

#### Duplicate Template
1. Click **menu icon** (⋮) on a template
2. Select **"Duplicate"**
3. A copy is created with "(Copy)" suffix
4. Edit the duplicate as needed

#### Edit Template
1. Click **menu icon** (⋮)
2. Select **"Edit"**
3. Make changes
4. Save to create new version

#### Delete Template
1. Click **menu icon** (⋮)
2. Select **"Delete"**
3. Confirm deletion
4. **Warning**: This cannot be undone

### Search & Filter
- Use search bars to find templates and responses
- Search works on:
  - Template names
  - Descriptions
  - Tags
  - Categories

### Categories & Tags
- **Categories**: Broad classification (Safety, Survey, Audit)
- **Tags**: Flexible keywords for detailed organization
- Both are searchable

---

## Tips & Best Practices

### Template Design
1. **Start Simple**: Begin with basic questions, add complexity later
2. **Use Help Text**: Guide users with clear instructions
3. **Logical Flow**: Order questions from general to specific
4. **Section Breaks**: Group related questions into sections
5. **Test First**: Fill out your template before sharing

### Validation
1. **Mark Required Fields**: Only require essential information
2. **Set Reasonable Limits**: Don't make min/max too restrictive
3. **Custom Messages**: Write clear, helpful error messages

### Conditional Logic
1. **Keep It Simple**: Complex logic can confuse users
2. **Test Thoroughly**: Verify all condition paths work
3. **Provide Context**: Use help text to explain why questions appear

### Scoring
1. **Clear Criteria**: Make scoring rules transparent
2. **Balanced Points**: Distribute points fairly across questions
3. **Score Categories**: Use meaningful category names

---

## Troubleshooting

### Question Not Appearing
- Check conditional logic settings
- Verify previous answers match conditions
- Ensure logic type (AND/OR) is correct

### Validation Errors
- Read error message carefully
- Check validation rules in template
- Ensure input format matches requirements

### Template Not Saving
- Verify all required fields are filled
- Check for validation errors
- Ensure template has at least one question

### Data Not Persisting
- Data is stored in browser's local storage
- Clearing browser data will delete templates/responses
- Use export feature (future) to backup data

---

## Keyboard Shortcuts

- **Enter**: Add tag (in tag input field)
- **Tab**: Navigate between form fields
- **Esc**: Close dialogs/menus

---

## Support

For issues or questions:
1. Check this user guide
2. Review the FEATURES.md documentation
3. Check browser console for errors
4. Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

---

## Data Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Clear browser storage to delete all data
- Export templates before clearing browser data
