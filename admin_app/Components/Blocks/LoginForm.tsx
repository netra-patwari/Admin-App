'use client'
import React, { useState } from 'react'
import { Card, CloseButton, Button, Input, PasswordInput, Text, Group, Anchor, em } from '@mantine/core';

import CustomButton from './CustomButton';

type Action = any;


const LoginForm = ({ action }: { action: Action }) => {

    const [errors, setErrors] = useState<string | null>(null);
    const [email, setEmail] = useState('')
    const [errorBorder, setErrorBorder] = useState<boolean>(false)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [submit, setSubmit] = useState<boolean>(true)
    const [buttonText, setButtonText] = useState('Continue with Email');
    const [passErrors, setPassErrors] = useState('');
    const [errorPassBorder, setErrorPassBorder] = useState<boolean>(false)
    
    const handleSubmitClient = (e: React.FormEvent<HTMLFormElement>) => {
        if (submit) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                setErrors('Email address is not valid.');
                setErrorBorder(true)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (submit) {
            e.preventDefault();
            setErrors('');
            setErrorBorder(false)
            setEmail(e.target.value);
        } else {


            setButtonText('Continue with Email')
            setShowPass(false);
            setSubmit(true);
        }
    }


    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassErrors('');
        setErrorPassBorder(false)

    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setButtonText('Continue with Email')
        setEmail('')

        setShowPass(false);
        setSubmit(true);
    }





    return (
        <Card className='w-[450px]' shadow="sm" padding="lg" m="md" radius="md">
            <div className="my-2 mx-4">
                <Text fw={700} ta="center" mb="lg" size="xl">Log in to AdminApp</Text>
  

                <form className='mt-1' onSubmit={handleSubmitClient} action={
                    async (formData) => {
                        const { error, showPass, newUser, passerr } = await action(formData);
                        if (error) {
                            setErrors(error);
                            setErrorBorder(true)
                        }

                        if (showPass) {
                            setShowPass(true)
                            setSubmit(false)
                            setButtonText('Continue with Password')
                        }

                        if (passerr || passerr === '') {
                            setPassErrors(passerr);

                            if (passerr !== '') {
                                setErrorPassBorder(true)
                            }
                        }
                    }}>



                    <Input.Wrapper c="gray.8" label="Email address" error={errors}>
                        <Input onChange={handleChange} value={email} name='email' error={errorBorder} size="md" fs="md" radius="md" placeholder="name@company.com"
                            rightSectionPointerEvents="all"

                            rightSection={
                                <CloseButton
                                      aria-label="Clear input"
                                    onClick={handleClick}
                                    style={{ display: email ? undefined : 'none' }}
                                />
                            }
                        />
                    </Input.Wrapper>

                    {showPass && (
                        <div>



                            <Input.Wrapper mt={12} c="gray.8" label="Password" error={passErrors}>
                                <PasswordInput onChange={handlePassChange} size="md" name='password' radius="md" error={errorPassBorder} placeholder="Your password" id="your-password" />

                            </Input.Wrapper>


                        </div>
                    )
                    }




                    <CustomButton buttonText={buttonText} />

                </form>

            </div>
        </Card>
    )
}

export default LoginForm
