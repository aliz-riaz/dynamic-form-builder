'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/formStore';
import { useDataStore } from '@/stores/dataStore';
import FormRenderer from '@/components/FormRenderer/FormRenderer';
import { v4 as uuidv4 } from 'uuid';

export default function RenderPage() {
  const router = useRouter();
  const { forms } = useFormStore();
  const { saveSubmission, saveDraft } = useDataStore();
  const [selectedFormId, setSelectedFormId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedForm = forms.find((f) => f.id === selectedFormId);

  const handleSubmit = async (data: Record<string, any>) => {
    if (selectedForm) {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      saveSubmission({
        id: uuidv4(),
        formId: selectedForm.id,
        formVersion: selectedForm.version,
        data,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/data');
      }, 2000);
    }
  };

  const handleSaveDraft = async (data: Record<string, any>) => {
    if (selectedForm) {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      saveDraft({
        id: uuidv4(),
        formId: selectedForm.id,
        formVersion: selectedForm.version,
        data,
        submittedAt: new Date().toISOString(),
        status: 'draft',
      });
      alert('Draft saved successfully!');
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/')}
        sx={{ mb: 2 }}
      >
        Back to Home
      </Button>

      <Typography variant="h4" gutterBottom>
        Form Renderer
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Form</InputLabel>
        <Select
          value={selectedFormId}
          label="Select Form"
          onChange={(e) => setSelectedFormId(e.target.value)}
        >
          {forms.map((form) => (
            <MenuItem key={form.id} value={form.id}>
              {form.title} (v{form.version})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Form submitted successfully! Redirecting to data page...
        </Alert>
      )}

      {selectedForm ? (
        <FormRenderer
          schema={selectedForm}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          Please select a form to render
        </Typography>
      )}
    </Box>
  );
}