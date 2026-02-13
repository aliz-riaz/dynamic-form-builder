'use client';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FormField, FieldType, FieldOption } from '@/types/form.types';
import { useState } from 'react';

interface FieldEditorProps {
  field: FormField;
  onChange: (field: FormField) => void;
}

export default function FieldEditor({ field, onChange }: FieldEditorProps) {
  const [newOption, setNewOption] = useState('');

  const handleChange = (key: keyof FormField, value: any) => {
    onChange({ ...field, [key]: value });
  };

  const addOption = () => {
    if (newOption.trim()) {
      const options = field.options || [];
      options.push({
        label: newOption,
        value: newOption.toLowerCase().replace(/\s+/g, '_'),
      });
      handleChange('options', options);
      setNewOption('');
    }
  };

  const deleteOption = (index: number) => {
    const options = [...(field.options || [])];
    options.splice(index, 1);
    handleChange('options', options);
  };

  const updateOption = (index: number, label: string) => {
    const options = [...(field.options || [])];
    options[index] = {
      label: label,
      value: label.toLowerCase().replace(/\s+/g, '_'),
    };
    handleChange('options', options);
  };

  const fieldTypes: FieldType[] = [
    'text',
    'email',
    'password',
    'textarea',
    'date',
    'datetime',
    'dropdown',
    'checkbox',
    'radio',
    'toggle',
  ];

  const needsOptions = ['dropdown', 'checkbox', 'radio'].includes(field.type);

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Field Type</InputLabel>
          <Select
            value={field.type}
            label="Field Type"
            onChange={(e) => handleChange('type', e.target.value as FieldType)}
          >
            {fieldTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Label"
          value={field.label}
          onChange={(e) => handleChange('label', e.target.value)}
        />

        <TextField
          fullWidth
          label="Field Name"
          value={field.name}
          onChange={(e) => handleChange('name', e.target.value)}
          helperText="Unique identifier (e.g., firstName)"
        />

        <TextField
          fullWidth
          label="Placeholder"
          value={field.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
        />

        <TextField
          fullWidth
          label="Default Value"
          value={field.defaultValue || ''}
          onChange={(e) => handleChange('defaultValue', e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Column Span</InputLabel>
          <Select
            value={field.columnSpan || 2}
            label="Column Span"
            onChange={(e) => handleChange('columnSpan', e.target.value)}
          >
            <MenuItem value={1}>1 Column</MenuItem>
            <MenuItem value={2}>2 Columns</MenuItem>
            <MenuItem value={3}>3 Columns</MenuItem>
            <MenuItem value={4}>4 Columns</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={field.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
            />
          }
          label="Required Field"
        />
      </Box>

      {/* Validation Rules */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Validation Rules
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            fullWidth
            label="Min Length"
            type="number"
            value={field.validation?.minLength || ''}
            onChange={(e) =>
              handleChange('validation', {
                ...field.validation,
                minLength: parseInt(e.target.value) || undefined,
              })
            }
          />
          <TextField
            fullWidth
            label="Max Length"
            type="number"
            value={field.validation?.maxLength || ''}
            onChange={(e) =>
              handleChange('validation', {
                ...field.validation,
                maxLength: parseInt(e.target.value) || undefined,
              })
            }
          />
        </Box>
      </Box>

      {/* Options for dropdown, checkbox, radio */}
      {needsOptions && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Options
          </Typography>
          {(field.options || []).map((option, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
            >
              <TextField
                fullWidth
                size="small"
                label={`Option ${index + 1}`}
                value={option.label || ''}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder="Enter option"
              />
              <TextField
                size="small"
                label="Value"
                value={option.value || ''}
                disabled
                sx={{ width: '150px' }}
              />
              <IconButton 
                size="small" 
                onClick={() => deleteOption(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add new option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addOption();
                }
              }}
            />
            <Button 
              size="small" 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={addOption}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}