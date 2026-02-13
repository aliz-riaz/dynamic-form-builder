'use client';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { useFormStore } from '@/stores/formStore';
import { FormSchema } from '@/types/form.types';

export default function CreateFormPage() {
  const router = useRouter();
  const { addForm } = useFormStore();

  const handleSave = (form: FormSchema) => {
    addForm(form);
    router.push('/forms');
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/forms')}
        sx={{ mb: 2 }}
      >
        Back to Forms List
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Create New Form
      </Typography>
      <FormBuilder onSave={handleSave} />
    </Box>
  );
}