import React from 'react';
import {
  Typography,
  Box,
  Button,
} from '@mui/material';
import { FileText, ClipboardList, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTemplateStore from '../store/templateStore';
import useFormStore from '../store/formStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { templates } = useTemplateStore();
  const { responses } = useFormStore();

  const completedResponses = responses.filter((r) => r.status === 'completed').length;
  const inProgressResponses = responses.filter((r) => r.status === 'in_progress').length;

  const stats = [
    {
      title: 'Templates',
      value: templates.length,
      icon: FileText,
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      title: 'Responses',
      value: responses.length,
      icon: ClipboardList,
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      title: 'Completed',
      value: completedResponses,
      icon: CheckCircle,
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      title: 'In Progress',
      value: inProgressResponses,
      icon: Clock,
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', px: { xs: 2, sm: 3 }, py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of your questionnaire system
        </Typography>
      </Box>

      {/* Stats Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Box
              key={stat.title}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} color={stat.color} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.7rem',
          }}
        >
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {/* Create Template */}
          <Box
            onClick={() => navigate('/templates/new')}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#fafafa',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
              }}
            >
              <Plus size={18} color="#6b7280" />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
              Create Template
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Build a new questionnaire
            </Typography>
          </Box>

          {/* View Templates */}
          <Box
            onClick={() => navigate('/templates')}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#fafafa',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
              }}
            >
              <FileText size={18} color="#6b7280" />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
              View Templates
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Manage your templates
            </Typography>
          </Box>

          {/* View Responses */}
          <Box
            onClick={() => navigate('/forms')}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#fafafa',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
              }}
            >
              <ClipboardList size={18} color="#6b7280" />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
              View Responses
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Review submissions
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Empty State */}
      {templates.length === 0 && (
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
            backgroundColor: '#fafafa',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
            Get Started
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create your first template to start collecting responses
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<Plus size={16} />}
            onClick={() => navigate('/templates/new')}
          >
            Create Template
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
