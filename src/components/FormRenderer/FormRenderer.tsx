'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  FormGroup,
  FormLabel,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FormSchema, FormField } from '@/types/form.types';

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onSaveDraft?: (data: Record<string, any>) => Promise<void>;
  initialData?: Record<string, any>;
  draftId?: string;
  submitButtonText?: string; // New prop
  draftButtonText?: string;  // New prop
}

export default function FormRenderer({
  schema,
  onSubmit,
  onSaveDraft,
  initialData = {},
  draftId,
  submitButtonText = 'Submit',
  draftButtonText = 'Save Draft',
}: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Initialize with default values for toggle fields
    const initial = { ...initialData };
    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'toggle' && initial[field.name] === undefined) {
          initial[field.name] = field.defaultValue ?? false;
        }
      });
    });
    return initial;
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    schema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        // Skip toggle validation - false is a valid value
        if (field.type === 'toggle') {
          return;
        }

        const value = formData[field.name];

        if (field.required) {
          // Check for empty strings, null, undefined
          if (value === undefined || value === null || value === '') {
            newErrors[field.name] = `${field.label} is required`;
          }
          // For arrays (checkbox), check if at least one is selected
          else if (Array.isArray(value) && value.length === 0) {
            newErrors[field.name] = `${field.label} is required`;
          }
        }

        if (field.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            newErrors[field.name] = 'Invalid email format';
          }
        }

        if (value && typeof value === 'string') {
          if (field.validation?.minLength && value.length < field.validation.minLength) {
            newErrors[field.name] = `Minimum ${field.validation.minLength} characters required`;
          }
          if (field.validation?.maxLength && value.length > field.validation.maxLength) {
            newErrors[field.name] = `Maximum ${field.validation.maxLength} characters allowed`;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Submit error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleClear = () => {
    // Reset to default values
    const resetData: Record<string, any> = {};
    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'toggle') {
          resetData[field.name] = field.defaultValue ?? false;
        }
      });
    });
    setFormData(resetData);
    setErrors({});
  };

  const handleSaveDraft = async () => {
    if (onSaveDraft) {
      setIsSavingDraft(true);
      try {
        await onSaveDraft(formData);
      } catch (error) {
        console.error('Draft save error:', error);
      } finally {
        setIsSavingDraft(false);
      }
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] !== undefined 
      ? formData[field.name] 
      : (field.defaultValue !== undefined ? field.defaultValue : '');
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <TextField
            fullWidth
            type={field.type}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            required={field.required}
            error={!!error}
            helperText={error}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            required={field.required}
            error={!!error}
            helperText={error}
          />
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={field.label}
              value={value ? dayjs(value) : null}
              onChange={(newValue: Dayjs | null) =>
                handleFieldChange(field.name, newValue?.toISOString())
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  name: field.name,
                  required: field.required,
                  error: !!error,
                  helperText: error,
                },
              }}
            />
          </LocalizationProvider>
        );

      case 'datetime':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={field.label}
              value={value ? dayjs(value) : null}
              onChange={(newValue: Dayjs | null) =>
                handleFieldChange(field.name, newValue?.toISOString())
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  name: field.name,
                  required: field.required,
                  error: !!error,
                  helperText: error,
                },
              }}
            />
          </LocalizationProvider>
        );

      case 'dropdown':
        return (
          <FormControl fullWidth required={field.required} error={!!error}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              name={field.name}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl required={field.required} error={!!error}>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup
              name={field.name}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl required={field.required} error={!!error}>
            <FormLabel>{field.label}</FormLabel>
            <FormGroup>
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      name={field.name}
                      checked={
                        Array.isArray(value) ? value.includes(option.value) : false
                      }
                      onChange={(e) => {
                        const currentValues = Array.isArray(value) ? value : [];
                        if (e.target.checked) {
                          handleFieldChange(field.name, [...currentValues, option.value]);
                        } else {
                          handleFieldChange(
                            field.name,
                            currentValues.filter((v) => v !== option.value)
                          );
                        }
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        );

      case 'toggle':
        return (
          <FormControlLabel
            control={
              <Switch
                name={field.name}
                checked={Boolean(value)}
                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              />
            }
            label={field.label}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {schema.title}
        </Typography>
        {schema.description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {schema.description}
          </Typography>
        )}
      </Paper>



{schema.sections.map((section) => (
  <Paper key={section.id} sx={{ p: 3, mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      {section.title}
    </Typography>
    {section.description && (
      <Typography variant="body2" color="text.secondary" paragraph>
        {section.description}
      </Typography>
    )}

    {/* Visual Grid Guide */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        mt: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent calc(25% - 8px))',
          pointerEvents: 'none',
          opacity: 0.2,
          zIndex: 0,
        },
      }}
    >
      {section.fields.map((field) => (
        <Box
          key={field.id}
          sx={{
            gridColumn: `span ${field.columnSpan || 2}`,
            position: 'relative',
            p: 1,
            border: '1px dashed transparent',
            borderRadius: 1,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: '#f5f5f5',
              borderColor: '#1976d2',
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -8,
              right: 4,
              bgcolor: 'white',
              px: 0.5,
              color: 'text.secondary',
              fontSize: '0.7rem',
              border: '1px solid #e0e0e0',
              borderRadius: 0.5,
            }}
          >
            {field.columnSpan || 2}/4
          </Typography>
          {renderField(field)}
        </Box>
      ))}
    </Box>
  </Paper>
))}
      <Paper sx={{ p: 2, position: 'sticky', bottom: 0, zIndex: 1 }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            onClick={handleClear}
            disabled={isSubmitting || isSavingDraft}
          >
            Clear
          </Button>
          {onSaveDraft && (
            <Button 
              variant="outlined" 
              onClick={handleSaveDraft}
              disabled={isSubmitting || isSavingDraft}
            >
              {isSavingDraft ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                draftButtonText
              )}
            </Button>
          )}
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={isSubmitting || isSavingDraft}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                Submitting...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}