'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormSchema, FormSection, FormField } from '@/types/form.types';
import FieldEditor from './FieldEditor';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderProps {
  initialForm?: FormSchema;
  onSave: (form: FormSchema) => void;
}

export default function FormBuilder({ initialForm, onSave }: FormBuilderProps) {
  const [formTitle, setFormTitle] = useState(initialForm?.title || '');
  const [formDescription, setFormDescription] = useState(
    initialForm?.description || ''
  );
  const [sections, setSections] = useState<FormSection[]>(
    initialForm?.sections || []
  );

  const addSection = () => {
    const newSection: FormSection = {
      id: uuidv4(),
      title: 'New Section',
      fields: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (index: number, updatedSection: FormSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  const deleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addField = (sectionIndex: number) => {
    const newField: FormField = {
      id: uuidv4(),
      type: 'text',
      label: 'New Field',
      name: `field_${Date.now()}`,
      columnSpan: 2,
    };
    const newSections = [...sections];
    newSections[sectionIndex].fields.push(newField);
    setSections(newSections);
  };

  const updateField = (
    sectionIndex: number,
    fieldIndex: number,
    updatedField: FormField
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields[fieldIndex] = updatedField;
    setSections(newSections);
  };

  const deleteField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields = newSections[sectionIndex].fields.filter(
      (_, i) => i !== fieldIndex
    );
    setSections(newSections);
  };

  const handleSave = () => {
    const form: FormSchema = {
      id: initialForm?.id || uuidv4(),
      version: initialForm?.version || '1.0',
      title: formTitle,
      description: formDescription,
      sections,
      createdAt: initialForm?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(form);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Form Details
        </Typography>
        <TextField
          fullWidth
          label="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Form Description"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          margin="normal"
          multiline
          rows={2}
        />
      </Paper>

      {sections.map((section, sectionIndex) => (
        <Accordion key={section.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Typography>{section.title}</Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSection(sectionIndex);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Section Title"
              value={section.title}
              onChange={(e) =>
                updateSection(sectionIndex, {
                  ...section,
                  title: e.target.value,
                })
              }
              margin="normal"
            />

            <Box sx={{ mt: 2 }}>
              {section.fields.map((field, fieldIndex) => (
                <Paper key={field.id} sx={{ p: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">{field.label}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => deleteField(sectionIndex, fieldIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <FieldEditor
                    field={field}
                    onChange={(updatedField) =>
                      updateField(sectionIndex, fieldIndex, updatedField)
                    }
                  />
                </Paper>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addField(sectionIndex)}
              >
                Add Field
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addSection}>
          Add Section
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save Form
        </Button>
      </Box>
    </Box>
  );
}