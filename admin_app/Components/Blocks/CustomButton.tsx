import React , { useState } from 'react'
import { Button } from '@mantine/core';
import { useFormStatus } from 'react-dom';

const CustomButton = ({buttonText} : {buttonText : string}) => {

  const { pending } = useFormStatus();
  return (
    <>
      {pending ? <Button fullWidth mt="xl" radius="md" size='md' loading loaderProps={{ type: 'dots' }}>
        Loading button
      </Button>
        : <Button color="" type='submit' fullWidth mt="xl" radius="md" size='md' fz="md" >
          {buttonText}
        </Button>}

    </>
  )
}

export default CustomButton
