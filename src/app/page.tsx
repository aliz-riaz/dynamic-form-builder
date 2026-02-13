'use client';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import DatasetIcon from '@mui/icons-material/Dataset';

export default function Home() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Welcome to Dynamic Form Builder
      </Typography>
      <Typography variant="body1" paragraph>
        Create, render, and manage dynamic forms with ease.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AddIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h5" gutterBottom>
            Form Creator
          </Typography>
          <Typography variant="body2" paragraph>
            Design and create dynamic forms with various field types
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/forms')}
          >
            Go to Forms
          </Button>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <ViewListIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h5" gutterBottom>
            Form Renderer
          </Typography>
          <Typography variant="body2" paragraph>
            Render forms from JSON schema and collect data
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/render')}
          >
            Render Forms
          </Button>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <DatasetIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h5" gutterBottom>
            Data Viewer
          </Typography>
          <Typography variant="body2" paragraph>
            View, edit, and manage form submissions
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/data')}
          >
            View Data
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}