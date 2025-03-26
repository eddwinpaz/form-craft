export interface SchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean';
  label?: string;
  description?: string;
  format?: 'date' | 'textarea';
  options?: { label: string; value: string | number }[];
  enum?: string[];
  maxLength?: number;
  minLength?: number;
  maximum?: number;
  minimum?: number;
}

export interface Schema {
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

export interface SchemaFormProps {
  schema: Schema;
  defaultData?: Record<string, any>;
  data?: Record<string, any>;
  columns?: number;
  onUpdate?: (data: Record<string, any>) => void;
}