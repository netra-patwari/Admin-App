'use server'
import axios from "axios"
import {API} from "@/data/api"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const deleteAction = async (email: string) => {
  const cookieStore = cookies()
    const email_obj = cookieStore.get('email')
    const password_obj = cookieStore.get('password')

    if (!email_obj || !password_obj) {
      redirect('/');
    }
  
    const email_id = email_obj?.value as string
    const password_id = password_obj?.value as string

  

    const url = `${API.API_BASE}/delete_user`
    const data = {  
      "email": email,

    }
    const config = {
      headers: {
        'email-id': email_id,
        'password-id': password_id
      }
    }

    try {
      const response = await axios.post(url, data, config);
      if (response.data.meta.status === 200) {
          revalidatePath('/')
      } 
  } catch (error) {
      console.error('Error deleting user:', error);
 
  }
   
}


