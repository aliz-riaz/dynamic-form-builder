'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { FormSchema, FormSection, FormField } from '@/types/form.types';
import FieldEditor from './FieldEditor';
import GridPreview from './GridPreview';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FormBuilderProps {
  initialForm?: FormSchema;
  onSave: (form: FormSchema) => void;
}

// Sortable Field Component
function SortableField({
  field,
  fieldIndex,
  sectionIndex,
  onUpdate,
  onDelete,
}: {
  field: FormField;
  fieldIndex: number;
  sectionIndex: number;
  onUpdate: (fieldIndex: number, updatedField: FormField) => void;
  onDelete: (fieldIndex: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 2,
        mb: 2,
        border: isDragging ? '2px dashed #1976d2' : '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          size="small"
          {...attributes}
          {...listeners}
          sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
        >
          <DragIndicatorIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {field.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Span: {field.columnSpan || 2} column{(field.columnSpan || 2) > 1 ? 's' : ''}
        </Typography>
        <IconButton size="small" onClick={() => onDelete(fieldIndex)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <FieldEditor field={field} onChange={(updatedField) => onUpdate(fieldIndex, updatedField)} />
    </Paper>
  );
}

export default function FormBuilder({ initialForm, onSave }: FormBuilderProps) {
  const [formTitle, setFormTitle] = useState(initialForm?.title || '');
  const [formDescription, setFormDescription] = useState(initialForm?.description || '');
  const [sections, setSections] = useState<FormSection[]>(initialForm?.sections || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
      options: [],
    };
    const newSections = [...sections];
    newSections[sectionIndex].fields.push(newField);
    setSections(newSections);
  };

  const updateField = (sectionIndex: number, fieldIndex: number, updatedField: FormField) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields[fieldIndex] = updatedField;
    setSections(newSections);
  };

  const deleteField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields = newSections[sectionIndex].fields.filter((_, i) => i !== fieldIndex);
    setSections(newSections);
  };

  const handleDragEnd = (event: DragEndEvent, sectionIndex: number) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newSections = [...sections];
      const fields = newSections[sectionIndex].fields;
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      newSections[sectionIndex].fields = arrayMove(fields, oldIndex, newIndex);
      setSections(newSections);
    }
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
      

<Paper 
  sx={{ 
    p: 4, 
    mb: 4,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    border: '2px solid #e2e8f0',
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}
    >
      📝
    </Box>
    <Typography variant="h5" fontWeight={700}>
      Form Details
    </Typography>
  </Box>
  
  <TextField
    fullWidth
    label="Form Title"
    value={formTitle}
    onChange={(e) => setFormTitle(e.target.value)}
    margin="normal"
    required
    placeholder="Enter a descriptive title for your form"
  />
  <TextField
    fullWidth
    label="Form Description"
    value={formDescription}
    onChange={(e) => setFormDescription(e.target.value)}
    margin="normal"
    multiline
    rows={3}
    placeholder="Describe what this form is for..."
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
              <Typography variant="h6">{section.title}</Typography>
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
              onChange={(e) => updateSection(sectionIndex, { ...section, title: e.target.value })}
              margin="normal"
            />

            <Divider sx={{ my: 2 }} />

            {/* Grid Preview */}
            <GridPreview fields={section.fields} />

            <Typography variant="subtitle1" gutterBottom>
              Fields (Drag to reorder)
            </Typography>

            {section.fields.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  No fields added yet. Click "Add Field" to get started.
                </Typography>
              </Paper>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, sectionIndex)}
              >
                <SortableContext items={section.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                  {section.fields.map((field, fieldIndex) => (
                    <SortableField
                      key={field.id}
                      field={field}
                      fieldIndex={fieldIndex}
                      sectionIndex={sectionIndex}
                      onUpdate={(idx, updatedField) => updateField(sectionIndex, idx, updatedField)}
                      onDelete={(idx) => deleteField(sectionIndex, idx)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}

            <Button startIcon={<AddIcon />} onClick={() => addField(sectionIndex)} variant="outlined">
              Add Field
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addSection}>
          Add Section
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!formTitle}>
          Save Form
        </Button>
      </Box>
    </Box>
  );
}