
"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input, Button, Notification, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import CustomInput from '../UI/Input';
import CustomButton from './CustomButton';

interface NewUserFormProps {
  action?: any;
}

interface Data {
  name: string;
  role: string;
}

const NewUserForm = ({ action }: NewUserFormProps) => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<Data>({
    name: '',
    role: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Data>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userString = sessionStorage.getItem('editData');
    const user = userString ? JSON.parse(userString) : null;
    if (!user) {
      console.log(user);
      router.replace('/');
    } else {
      setUser(user);
      setData({
        name: user.name,
        role: user.job_title,
      });
    }
  }, [router]);

  const validateForm = (): boolean => {
    const errors: Partial<Data> = {};
    let isValid = true;

    if (!data.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!data.role.trim()) {
      errors.role = 'Role is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (!validateForm()) {
      event.preventDefault();
    }
  };

  const handleInputChange = (fieldName: keyof Data, value: string): void => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  if (!user) return null;

  return (
    <div className='grid gap-2'>
      {message && (
        
        <Notification icon={xIcon} color='red' title={message}>

        </Notification>
      )}
      <form
        onSubmit={handleSubmit}
        action={async (formData: FormData) => {
          const { message } = await action(formData, user.email, user.age);
          if (message) {
            setMessage(message);
          }
        }}>
        <CustomInput
          label='Name'
          error={formErrors.name}
          placeholder='John Doe'
          value={data.name}
          onchange={(event) => handleInputChange('name', event.target.value)} 
          name='name'
          />


        <CustomInput
          label='Role'
          error={formErrors.role}
          placeholder='Job role'
          value={data.role}
          name='job_role'
          onchange={(event) => handleInputChange('role', event.target.value)} />

        <CustomButton buttonText='Edit User'/>
      </form>
    </div>
  );
};

export default NewUserForm;

