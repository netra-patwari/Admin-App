"use client"
import React, { useState } from 'react';
import { Input, Select, Button, Notification, rem } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import CustomInput from '../UI/Input';
import CustomButton from './CustomButton';

interface NewUserFormProps {
  action?: any
}

interface Data {
  name: string;
  email: string;
  role: string;
  age: string;
}

const NewUserForm = ({ action }: NewUserFormProps) => {
  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    role: '',
    age: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Data>>({});
  const [message, setMessage] = useState('')

  const validateForm = (): boolean => {
    const errors: Partial<Data> = {};
    let isValid = true;

    if (!data.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!data.role.trim()) {
      errors.role = 'Role is required';
      isValid = false;
    }

    if (!data.age.trim()) {
      errors.age = 'Age is required';
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



  const handleSelectChange = (value: string): void => {
    setData({
      ...data,
      age: value,
    });
  };


  const handleInputChange = (fieldName: keyof Data, value: string): void => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const ageOptions = Array.from({ length: 46 }, (_, i) => (i + 15).toString());

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    <div className='grid gap-2'>
      {
        message && <Notification icon={xIcon} color="red" title={message}>
        </Notification>
      }
      <form
        onSubmit={handleSubmit}
        action={async (formData: FormData) => {
          const { message } = await action(formData)
          if (message) {
            setMessage(message)
          }
        }}      >


          <CustomInput label="Name" error={formErrors.name} name='name' placeholder='John Doe' value={data.name} onchange={(event) => handleInputChange('name', event.target.value)}/>
          <CustomInput label="Email" error={formErrors.email} name='email' placeholder='johndoe@company.com' value={data.email} onchange={(event) => handleInputChange('email', event.target.value)}/>
          <CustomInput label="Role" error={formErrors.role} name='job_role' placeholder='Job role' value={data.role} onchange={(event) => handleInputChange('role', event.target.value)}/>
          <Select name='age' label="Age" placeholder="Age" value={data.age} onChange={(value) => handleSelectChange(value ?? '')} data={ageOptions} error={formErrors.age}/>

          <CustomButton buttonText='New User'/>

      </form>
    </div>
  );
};

export default NewUserForm;

