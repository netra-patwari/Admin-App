import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from "@/Components/Blocks/LoginForm"
import axios from 'axios'
import { API } from '@/data/api'


const page = () => {
    const cookieStore = cookies();
    const email = cookieStore.get('email');
    const password = cookieStore.get('password');

    if (email && password) {
        redirect('/');
      }

    const handleAction = async (formData : FormData) => {
        'use server'
        const email: string = formData.get('email') as string;
        const password: string = formData.get('password') as string;
        console.log(password,email);
        
        if (password === null) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!emailRegex.test(email)) {
                return { error: 'Email is not valid', passerr: '', showPass: false, newUser: false };
            }
            if (emailRegex.test(email) && email !== 'admin@admin.com') {
                return { error: 'Not a user', passerr: '', showPass: false, newUser: true };
            } else {
                return { error: '', passerr: '', showPass: true, newUser: false };
            }
        } else {
            if (password === '') {

                return { error: '', passerr: 'Password required', showPass: true, newUser: false };
            } else if (password !== 'Admin@123') {
                return { error: '', passerr: 'Password is incorrect', showPass: true, newUser: false };
            } else if (password === 'Admin@123') {
                const data = {
                  email:email,
                  password:password
                }
                const response = await axios.post( `${API.API_BASE}/login` , data)
                console.log(response.data)
                if (response.data.meta.status == 200) {
                  cookies().set('email', email , { secure: true })
                  cookies().set('password', password , { secure: true })
            
                  redirect('/')
        
                }
            
                redirect('/')
            }
        }
    };

    return (
        <>

            <div 
            
            

            className="h-[100dvh] w-full bg-gray-50 relative flex items-center justify-center bg-style">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-transparent "></div>


             <LoginForm action={handleAction}/>


            </div>

        </>

    )
}

export default page;
