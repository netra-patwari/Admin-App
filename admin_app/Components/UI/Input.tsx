'use client'
import React from 'react'
import { Input} from '@mantine/core';

interface CustomInputProps {
    label: string;
    error?: string | null;
    value: string;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
}

const CustomInput = ({ label , error , value , onchange , placeholder , name } : CustomInputProps  ) => {
  return (
<>

<Input.Wrapper label={label} error={error}>
          <Input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
          />
        </Input.Wrapper>
</>

  )
}

export default CustomInput
