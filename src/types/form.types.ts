export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'date'
  | 'datetime'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'toggle';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  custom?: string;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  validation?: ValidationRule;
  options?: FieldOption[];
  columnSpan?: 1 | 2 | 3 | 4;
  dependsOn?: {
    fieldId: string;
    condition: string;
    value: any;
  };
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  version: string;
  title: string;
  description?: string;
  sections: FormSection[];
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  formVersion: string;
  data: Record<string, any>;
  submittedAt: string;
  status: 'draft' | 'submitted';
}