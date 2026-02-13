'use client';
import { useParams } from 'next/navigation';
import { Box, Typography, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { useDataStore } from '@/stores/dataStore';
import { useFormStore } from '@/stores/formStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ViewSubmissionPage() {
  const params = useParams();
  const { getSubmissionById } = useDataStore();
  const { getFormById } = useFormStore();

  const submissionId = params.id as string;
  const submission = getSubmissionById(submissionId);
  const form = submission ? getFormById(submission.formId) : null;

  if (!submission || !form) {
    return <Typography>Submission not found</Typography>;
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        component={Link}
        href="/data"
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>

      <Typography variant="h4" gutterBottom>
        {form.title} - Submission Details
      </Typography>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Submitted: {new Date(submission.submittedAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Form Version: {submission.formVersion}
        </Typography>
      </Paper>

      {form.sections.map((section) => (
        <Paper key={section.id} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {section.fields.map((field) => (
              <Box key={field.id}>
                <Typography variant="subtitle2" color="text.secondary">
                  {field.label}
                </Typography>
                <Typography variant="body1">
                  {submission.data[field.name]
                    ? Array.isArray(submission.data[field.name])
                      ? submission.data[field.name].join(', ')
                      : String(submission.data[field.name])
                    : '-'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}