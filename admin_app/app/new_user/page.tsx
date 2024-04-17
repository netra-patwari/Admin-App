import React from 'react'
import NewUserForm from '@/Components/Blocks/NewUserForm'
import { log } from 'console'
import axios from 'axios'
import { cookies } from 'next/headers'
import { API } from '@/data/api'
import { redirect } from 'next/navigation'

const page = () => {


  const action = async (formData : FormData) => {


    "use server"
    const cookieStore = cookies()
    const email_obj = cookieStore.get('email')
    const password_obj = cookieStore.get('password')

    if (!email_obj || !password_obj) {
      redirect('/');
    }
  
    log(email_obj)
    log(password_obj)
    const email_id = email_obj?.value as string
    const password_id = password_obj?.value as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const jobRole = formData.get('job_role') as string
    const age = formData.get('age') as string
    const ageNum = parseInt(age)

  

    const url = `${API.API_BASE}/create_user`
    const data = {  
      "name": name,
      "email": email,
      "job_title": jobRole,
      "age": ageNum
    }
    const config = {
      headers: {
        'email-id': email_id,
        'password-id': password_id
      }
    }

    const response = await axios.post(url , data , config)
    if (response.data.meta.status == 200) {
      redirect('/')
    }
    else {
      return { message : 'Email already in use' }
    }
  }

  return (
    <div className='px-5 py-5'>
      <NewUserForm action={action}/>
    </div>
  )
}

export default page
