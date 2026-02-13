import { Box, Paper, Typography, Chip } from '@mui/material';
import { FormField } from '@/types/form.types';
import GridOnIcon from '@mui/icons-material/GridOn';

interface GridPreviewProps {
  fields: FormField[];
}

export default function GridPreview({ fields }: GridPreviewProps) {
  if (fields.length === 0) return null;

  const getFieldColor = (type: string) => {
    const colors: Record<string, string> = {
      text: '#2563eb',
      email: '#8b5cf6',
      password: '#ef4444',
      textarea: '#10b981',
      date: '#f59e0b',
      datetime: '#f59e0b',
      dropdown: '#06b6d4',
      checkbox: '#ec4899',
      radio: '#8b5cf6',
      toggle: '#6366f1',
    };
    return colors[type] || '#64748b';
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 3, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '2px dashed #cbd5e1',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <GridOnIcon sx={{ color: '#64748b' }} />
        <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
          Layout Preview
        </Typography>
        <Chip label="4 Columns" size="small" sx={{ ml: 'auto' }} />
      </Box>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1.5,
          p: 2,
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #e2e8f0',
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.id}
            sx={{
              gridColumn: `span ${field.columnSpan || 2}`,
              border: '2px solid',
              borderColor: getFieldColor(field.type),
              borderRadius: 2,
              p: 2,
              background: `linear-gradient(135deg, ${getFieldColor(field.type)}10 0%, ${getFieldColor(field.type)}20 100%)`,
              minHeight: '80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="body2" fontWeight={700} noWrap sx={{ color: getFieldColor(field.type) }}>
              {field.label}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip 
                label={field.type} 
                size="small" 
                sx={{ 
                  height: 20, 
                  fontSize: '0.65rem',
                  bgcolor: getFieldColor(field.type),
                  color: 'white',
                  fontWeight: 600,
                }} 
              />
              <Chip 
                label={`${field.columnSpan || 2} cols`} 
                size="small" 
                variant="outlined"
                sx={{ height: 20, fontSize: '0.65rem' }} 
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}