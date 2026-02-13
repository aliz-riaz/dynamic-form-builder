'use client';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Chip, Paper } from '@mui/material';
import { useDataStore } from '@/stores/dataStore';
import { useFormStore } from '@/stores/formStore';
import FormRenderer from '@/components/FormRenderer/FormRenderer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EditSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const { getSubmissionById, updateSubmission, saveDraft, saveSubmission } = useDataStore();
  const { getFormById } = useFormStore();

  const submissionId = params.id as string;
  const submission = getSubmissionById(submissionId);
  const form = submission ? getFormById(submission.formId) : null;

  const isDraft = submission?.status === 'draft';

  const handleSubmit = async (data: Record<string, any>) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isDraft) {
      // Convert draft to submission
      saveSubmission({
        ...submission,
        data,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
      });
      alert('Draft submitted successfully!');
    } else {
      // Update existing submission
      updateSubmission(submissionId, data);
      alert('Submission updated successfully!');
    }
    
    router.push('/data');
  };

  const handleUpdateDraft = async (data: Record<string, any>) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    saveDraft({
      ...submission!,
      data,
      submittedAt: new Date().toISOString(),
    });
    alert('Draft updated successfully!');
    router.push('/data');
  };

  if (!submission || !form) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/data')}
          sx={{ mb: 2 }}
        >
          Back to Data List
        </Button>
        <Typography>Submission not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/data')}
        sx={{ mb: 2 }}
      >
        Back to Data List
      </Button>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {isDraft ? 'Edit Draft' : 'Edit Submission'}
        </Typography>
        <Chip 
          label={submission.status.toUpperCase()} 
          color={isDraft ? 'warning' : 'success'}
        />
      </Paper>

      {isDraft && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> This is a draft. You can either:
          </Typography>
          <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2, mt: 1 }}>
            <li><strong>Submit:</strong> Convert this draft into a final submission</li>
            <li><strong>Update Draft:</strong> Save changes but keep it as a draft</li>
          </Typography>
        </Paper>
      )}

      <FormRenderer
        schema={form}
        initialData={submission.data}
        onSubmit={handleSubmit}
        onSaveDraft={isDraft ? handleUpdateDraft : undefined}
        submitButtonText={isDraft ? 'Submit (Convert to Submission)' : 'Update Submission'}
        draftButtonText={isDraft ? 'Update Draft' : undefined}
      />
    </Box>
  );
}

