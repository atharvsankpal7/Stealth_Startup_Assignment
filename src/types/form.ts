export interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  accept?: string;
  multiple?: boolean;
  min?: string;
  max?: string;
}

export interface FormConfig {
  fields: FormField[];
}

export interface FormData {
  [key: string]: string | number;
}

export interface FormEntry extends FormData {
  id: string;
  timestamp: number;
  formType: string;
}