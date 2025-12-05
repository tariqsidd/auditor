import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Plus, Save } from 'lucide-react';
import QuestionEditor from './QuestionEditor';
import SortableQuestion from './SortableQuestion';
import { QuestionType } from '../../types';
import useTemplateStore from '../../store/templateStore';
import { useNavigate, useParams } from 'react-router-dom';

const FormBuilder = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const { getTemplateById, createTemplate, updateTemplate } = useTemplateStore();
  
  const existingTemplate = templateId ? getTemplateById(templateId) : null;
  
  const [template, setTemplate] = useState(
    existingTemplate || {
      name: '',
      description: '',
      category: '',
      tags: [],
      sections: [
        {
          id: crypto.randomUUID(),
          title: 'Main Section',
          questions: [],
        },
      ],
    }
  );

  const [tagInput, setTagInput] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const addQuestion = (sectionIndex) => {
    const newQuestion = {
      id: crypto.randomUUID(),
      type: QuestionType.TEXT,
      label: 'New Question',
      helpText: '',
      validations: [],
      conditionalLogic: { enabled: false, conditions: [], logic: 'AND' },
      scoring: { enabled: false, points: 0 },
    };

    const newSections = [...template.sections];
    newSections[sectionIndex].questions.push(newQuestion);
    setTemplate({ ...template, sections: newSections });
  };

  const updateQuestion = (sectionIndex, questionIndex, updatedQuestion) => {
    const newSections = [...template.sections];
    newSections[sectionIndex].questions[questionIndex] = updatedQuestion;
    setTemplate({ ...template, sections: newSections });
  };

  const deleteQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...template.sections];
    newSections[sectionIndex].questions.splice(questionIndex, 1);
    setTemplate({ ...template, sections: newSections });
  };

  const handleDragEnd = (event, sectionIndex) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const newSections = [...template.sections];
      const questions = newSections[sectionIndex].questions;
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);

      newSections[sectionIndex].questions = arrayMove(questions, oldIndex, newIndex);
      setTemplate({ ...template, sections: newSections });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !template.tags.includes(tagInput.trim())) {
      setTemplate({ ...template, tags: [...template.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTemplate({ ...template, tags: template.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSave = () => {
    if (templateId) {
      updateTemplate(templateId, template);
    } else {
      createTemplate(template);
    }
    navigate('/templates');
  };

  const allQuestions = template.sections.flatMap((section) => section.questions);

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          {templateId ? 'Edit Template' : 'New Template'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Build your questionnaire by adding questions below
        </Typography>
      </Box>

      {/* Template Info Card */}
      <Paper sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Template Name"
              placeholder="Enter name"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Description"
              placeholder="Brief description"
              value={template.description}
              onChange={(e) => setTemplate({ ...template, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Category"
              placeholder="e.g. Safety"
              value={template.category}
              onChange={(e) => setTemplate({ ...template, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Press Enter to add"
            />
          </Grid>
        </Grid>
        {template.tags.length > 0 && (
          <Stack direction="row" spacing={0.5} sx={{ mt: 1.5 }} flexWrap="wrap" useFlexGap>
            {template.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => removeTag(tag)}
                sx={{ mb: 0.5 }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Sections */}
      {template.sections.map((section, sectionIndex) => (
        <Box key={section.id} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1.5,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
            }}
          >
            {section.title}
          </Typography>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, sectionIndex)}
          >
            <SortableContext
              items={section.questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={1.5}>
                {section.questions.map((question, questionIndex) => (
                  <SortableQuestion key={question.id} id={question.id}>
                    <QuestionEditor
                      question={question}
                      onUpdate={(updated) => updateQuestion(sectionIndex, questionIndex, updated)}
                      onDelete={() => deleteQuestion(sectionIndex, questionIndex)}
                      allQuestions={allQuestions}
                    />
                  </SortableQuestion>
                ))}
              </Stack>
            </SortableContext>
          </DndContext>

          <Button
            variant="text"
            size="small"
            startIcon={<Plus size={16} />}
            onClick={() => addQuestion(sectionIndex)}
            sx={{ mt: 1.5, color: 'text.secondary' }}
          >
            Add Question
          </Button>
        </Box>
      ))}

      {/* Footer Actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button variant="text" size="small" onClick={() => navigate('/templates')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<Save size={16} />}
          onClick={handleSave}
        >
          Save Template
        </Button>
      </Box>
    </Box>
  );
};

export default FormBuilder;
