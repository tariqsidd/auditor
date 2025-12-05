import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { MoreVertical, Eye, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store/formStore';
import useTemplateStore from '../store/templateStore';
import { format } from 'date-fns';

const ResponseList = () => {
  const navigate = useNavigate();
  const { responses, deleteResponse } = useFormStore();
  const { getTemplateById } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleMenuOpen = (event, response) => {
    setAnchorEl(event.currentTarget);
    setSelectedResponse(response);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedResponse(null);
  };

  const handleView = () => {
    navigate(`/forms/view/${selectedResponse.id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      deleteResponse(selectedResponse.id);
    }
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredResponses = responses.filter((response) => {
    const template = getTemplateById(response.templateId);
    return template?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Form Responses
      </Typography>

      <TextField
        fullWidth
        placeholder="Search responses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
        }}
        sx={{ mb: 4 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Template</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Score</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResponses.map((response) => {
              const template = getTemplateById(response.templateId);
              return (
                <TableRow key={response.id}>
                  <TableCell>{template?.name || 'Unknown Template'}</TableCell>
                  <TableCell>
                    <Chip
                      label={response.status}
                      color={getStatusColor(response.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{format(new Date(response.createdAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    {response.completedAt
                      ? format(new Date(response.completedAt), 'MMM d, yyyy')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {response.score
                      ? `${response.score.score}/${response.score.maxScore} (${response.score.percentage.toFixed(1)}%)`
                      : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, response)}>
                      <MoreVertical size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredResponses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No responses found
          </Typography>
        </Box>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleView}>
          <Eye size={16} style={{ marginRight: 8 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ResponseList;
