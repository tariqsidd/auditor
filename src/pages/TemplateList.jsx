import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Plus, Search, MoreVertical, Edit, Copy, Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTemplateStore from '../store/templateStore';
import { format } from 'date-fns';

const TemplateList = () => {
  const navigate = useNavigate();
  const { templates, deleteTemplate, duplicateTemplate, searchTemplates } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleMenuOpen = (event, template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const handleEdit = () => {
    navigate(`/templates/edit/${selectedTemplate.id}`);
    handleMenuClose();
  };

  const handleDuplicate = () => {
    duplicateTemplate(selectedTemplate.id);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(selectedTemplate.id);
    }
    handleMenuClose();
  };

  const handleUseTemplate = (templateId) => {
    navigate(`/forms/new/${templateId}`);
  };

  const displayedTemplates = searchQuery
    ? searchTemplates(searchQuery)
    : templates;

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Templates</Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => navigate('/templates/new')}
        >
          Create Template
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
        }}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {displayedTemplates.map((template) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography variant="h6" gutterBottom>
                    {template.name}
                  </Typography>
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, template)}>
                    <MoreVertical size={20} />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description || 'No description'}
                </Typography>

                {template.category && (
                  <Chip label={template.category} size="small" sx={{ mb: 1 }} />
                )}

                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Version {template.version} • Updated{' '}
                    {format(new Date(template.updatedAt), 'MMM d, yyyy')}
                  </Typography>
                </Box>

                {template.tags && template.tags.length > 0 && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {template.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<FileText size={16} />}
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {displayedTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? 'No templates found' : 'No templates yet'}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => navigate('/templates/new')}
              sx={{ mt: 2 }}
            >
              Create Your First Template
            </Button>
          )}
        </Box>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TemplateList;
