import React, { useState } from 'react';
import { SchemaForm } from './components/ui/SchemaForm/SchemaForm';
import { Schema } from './components/ui/SchemaForm/types';

const schema: Schema = {
  properties: {
    firstName: {
      type: 'string',
      label: 'First Name',
      description: 'Enter your first name',
      minLength: 2,
      maxLength: 50
    },
    lastName: {
      type: 'string',
      label: 'Last Name',
      description: 'Enter your last name',
      minLength: 2,
      maxLength: 50
    },
    email: {
      type: 'string',
      label: 'Email Address',
      description: 'Enter your email address'
    },
    age: {
      type: 'integer',
      label: 'Age',
      minimum: 0,
      maximum: 150
    },
    bio: {
      type: 'string',
      label: 'Biography',
      format: 'textarea',
      description: 'Tell us about yourself'
    },
    role: {
      type: 'string',
      label: 'Role',
      options: [
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Manager', value: 'manager' }
      ]
    },
    newsletter: {
      type: 'boolean',
      label: 'Subscribe to newsletter'
    }
  },
  required: ['firstName', 'lastName', 'email']
};

function App() {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleUpdate = (data: Record<string, any>) => {
    setFormData(data);
    console.log('Form data updated:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Schema Form Demo</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SchemaForm 
            schema={schema} 
            columns={2} 
            onUpdate={handleUpdate}
          />
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Form Data:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;