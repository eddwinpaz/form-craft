import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Schema, SchemaFormProps, SchemaProperty } from './types';

export function SchemaForm({ 
  schema, 
  defaultData = {}, 
  columns = 1,
  onUpdate 
}: SchemaFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultData);

  useEffect(() => {
    if (Object.keys(defaultData).length > 0) {
      setFormData(defaultData);
    }
  }, [defaultData]);

  const updateField = (name: string, value: any) => {
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    onUpdate?.(updatedData);
  };

  const isRequired = (fieldName: string): boolean => {
    return schema.required?.includes(fieldName) || false;
  };

  const getFieldLabel = (name: string, property: SchemaProperty): string => {
    return property.label || name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const renderField = (name: string, property: SchemaProperty) => {
    const label = getFieldLabel(name, property);
    const required = isRequired(name);

    switch (property.type) {
      case 'string':
        if (property.options || property.enum) {
          const options = property.options || 
            (property.enum?.map(value => ({ label: value, value })) ?? []);
          
          return (
            <div className="form-field">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <select
                value={formData[name] || ''}
                onChange={(e) => updateField(name, e.target.value)}
                required={required}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{property.description || `Select ${label}`}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (property.format === 'date') {
          return (
            <div className="form-field">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                value={formData[name] || ''}
                onChange={(e) => updateField(name, e.target.value)}
                required={required}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        if (property.format === 'textarea') {
          return (
            <div className="form-field">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={formData[name] || ''}
                onChange={(e) => updateField(name, e.target.value)}
                required={required}
                maxLength={property.maxLength}
                minLength={property.minLength}
                placeholder={property.description}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
          );
        }

        return (
          <div className="form-field">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData[name] || ''}
              onChange={(e) => updateField(name, e.target.value)}
              required={required}
              maxLength={property.maxLength}
              minLength={property.minLength}
              placeholder={property.description}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'boolean':
        return (
          <div className="form-field">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData[name] || false}
                onChange={(e) => updateField(name, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
            </div>
          </div>
        );

      case 'number':
      case 'integer':
        return (
          <div className="form-field">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={formData[name] || ''}
              onChange={(e) => updateField(name, e.target.value)}
              required={required}
              max={property.maximum}
              min={property.minimum}
              step={property.type === 'integer' ? 1 : 'any'}
              placeholder={property.description}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form 
      className="grid gap-4" 
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
      }}
    >
      {Object.entries(schema.properties).map(([name, property]) => (
        <React.Fragment key={name}>
          {renderField(name, property)}
        </React.Fragment>
      ))}
    </form>
  );
}