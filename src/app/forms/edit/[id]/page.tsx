'use client';
import { useRouter, useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { useFormStore } from '@/stores/formStore';
import { FormSchema } from '@/types/form.types';

export default function EditFormPage() {
  const router = useRouter();
  const params = useParams();
  const { getFormById, updateForm } = useFormStore();
  
  const formId = params.id as string;
  const form = getFormById(formId);

  const handleSave = (updatedForm: FormSchema) => {
    updateForm(formId, updatedForm);
    router.push('/forms');
  };

  if (!form) {
    return <Typography>Form not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Form: {form.title}
      </Typography>
      <FormBuilder initialForm={form} onSave={handleSave} />
    </Box>
  );
}