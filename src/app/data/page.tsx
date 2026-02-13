'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDataStore } from '@/stores/dataStore';
import { useFormStore } from '@/stores/formStore';

export default function DataPage() {
  const router = useRouter();
  const { submissions, drafts, deleteSubmission } = useDataStore();
  const { getFormById } = useFormStore();
  const [currentTab, setCurrentTab] = useState(0);

  // Combine submissions and drafts
  const allData = currentTab === 0 ? submissions : drafts;

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this?')) {
      deleteSubmission(id);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Form Data
      </Typography>

      <Paper sx={{ mb: 2 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label={`Submissions (${submissions.length})`} />
          <Tab label={`Drafts (${drafts.length})`} />
        </Tabs>
      </Paper>

      {allData.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {currentTab === 0 ? 'No submissions yet' : 'No drafts saved yet'}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Form</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>{currentTab === 0 ? 'Submitted At' : 'Saved At'}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((item) => {
                const form = getFormById(item.formId);
                return (
                  <TableRow key={item.id}>
                    <TableCell>{form?.title || 'Unknown'}</TableCell>
                    <TableCell>{item.formVersion}</TableCell>
                    <TableCell>
                      {new Date(item.submittedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        color={item.status === 'submitted' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => router.push(`/data/view/${item.id}`)}
                        color="primary"
                        title="View"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => router.push(`/data/edit/${item.id}`)}
                        color="primary"
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item.id)}
                        color="error"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}