import React, { useState, useEffect } from 'react';
import { SchemaForm } from './components/ui/SchemaForm/SchemaForm';
import { Schema } from './components/ui/SchemaForm/types';
import { Loader2 } from 'lucide-react';

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

// Simulate an API call
const fetchUserData = () => {
  return new Promise<Record<string, any>>((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
        bio: 'A passionate developer with 5 years of experience.',
        role: 'developer',
        newsletter: true
      });
    }, 1500);
  });
};

function App() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUpdate = (data: Record<string, any>) => {
    setFormData(data);
    console.log('Form data updated:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Schema Form Demo</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-lg text-gray-600">Loading user data...</span>
            </div>
          ) : (
            <SchemaForm 
              schema={schema} 
              columns={2} 
              data={userData || undefined}
              onUpdate={handleUpdate}
            />
          )}
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