import React from 'react'
import EditUSerForm from '@/Components/Blocks/EditUSerForm';
import axios from 'axios'
import { cookies } from 'next/headers'
import { API } from '@/data/api'
import { redirect } from 'next/navigation'
import { log } from 'console';

const page = () => {

  const action = async (formData : FormData , Email:string , Age:string) => {

    "use server"

    const cookieStore = cookies()
    const email_obj = cookieStore.get('email')
    const password_obj = cookieStore.get('password')

    if (!email_obj || !password_obj) {
      redirect('/');
    }

    const email_id = email_obj?.value as string
    const password_id = password_obj?.value as string
    const name = formData.get('name') as string
    const jobRole = formData.get('job_role') as string

    const url = `${API.API_BASE}/edit_user`
    const data = {  
      "name": name,
      "email": Email,
      "job_title": jobRole,
      "age": parseInt(Age)
    }
    const config = {
      headers: {
        'email-id': email_id,
        'password-id': password_id
      }
    }

log(data)

    const response = await axios.post(url , data , config)
    if (response.data.meta.status == 200) {
      redirect('/')
    }
    else {
      return { message : 'Email already in use' }
    }
  }

 

  return (
    <div className='py-5 px-5' >
     <EditUSerForm action={action}/>
    </div>
  )
}

export default page;
