import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API } from '@/data/api';
import { log } from 'console';
import ActionButton from '@/Components/Blocks/ActionButton';


import DataTable from '@/Components/Blocks/Table';
async function fetchData() {
  const cookieStore = cookies();
  const email = cookieStore.get('email');
  const password = cookieStore.get('password');
  const config = {
    headers: {
      'email': email?.value,
      'password': password?.value,
    }
  };

  const response = await axios.get(`${API.API_BASE}/get_users`, config);
  return response.data.data;
}

export default async function Home() {
  const cookieStore = cookies();
  const email = cookieStore.get('email');
  const password = cookieStore.get('password');

  if (!email || !password) {
    redirect('/login');
  }

  let data = [];
  try {
    data = await fetchData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>

      <div className="py-5 px-10">

        <DataTable data={data} />
        
        <ActionButton />

      </div>

    </div>

  );
}
