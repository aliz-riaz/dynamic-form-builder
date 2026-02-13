'use client';
import { Box, Typography, Button, Paper, Card, CardContent, CardActions } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import DatasetIcon from '@mui/icons-material/Dataset';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: <AddIcon sx={{ fontSize: 48 }} />,
      title: 'Form Creator',
      description: 'Design beautiful forms with drag-and-drop interface and 10+ field types',
      color: '#2563eb',
      action: () => router.push('/forms'),
      buttonText: 'Create Forms',
    },
    {
      icon: <ViewListIcon sx={{ fontSize: 48 }} />,
      title: 'Form Renderer',
      description: 'Render forms from JSON schema with real-time validation and responsive layout',
      color: '#8b5cf6',
      action: () => router.push('/render'),
      buttonText: 'Render Forms',
    },
    {
      icon: <DatasetIcon sx={{ fontSize: 48 }} />,
      title: 'Data Viewer',
      description: 'View, edit and manage all form submissions with advanced filtering',
      color: '#10b981',
      action: () => router.push('/data'),
      buttonText: 'View Data',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            px: 2,
            py: 0.5,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%)',
            border: '1px solid #60a5fa',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 16, color: '#2563eb' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#1e40af' }}>
            Modern Form Builder
          </Typography>
        </Box>
        
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Build Dynamic Forms
          <br />
          In Minutes
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ maxWidth: 600, mx: 'auto', mb: 4, fontWeight: 400 }}
        >
          Create, customize, and deploy powerful forms with our intuitive drag-and-drop builder. 
          No coding required.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push('/forms/create')}
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/forms')}
            sx={{ px: 4, py: 1.5 }}
          >
            View Examples
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: 3 
      }}>
        {features.map((feature, index) => (
          <Card
            key={index}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              border: '1px solid #e2e8f0',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                borderColor: feature.color,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}30 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </Box>
              
              <Typography variant="h5" gutterBottom fontWeight={700}>
                {feature.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {feature.description}
              </Typography>
            </CardContent>
            
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={feature.action}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: feature.color,
                  color: feature.color,
                  '&:hover': {
                    borderColor: feature.color,
                    background: `${feature.color}10`,
                  },
                }}
              >
                {feature.buttonText}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Stats Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 4 }}>
            <Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                10+
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Field Types
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                4
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Column Grid
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                100%
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Type Safe
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}