import React from 'react'
import { useFormStatus } from 'react-dom';

const FormButton = () => {
    const { pending } = useFormStatus();

    return (
        <> 
            {pending ?
                <button className="w-full bg-blue-100 text-blue-500 py-1 px-2 rounded-lg hover:bg-blue-200 hover:text-blue-600">Loading</button>
                :
                <button className="w-full bg-blue-100 text-blue-500 py-1 px-2 rounded-lg hover:bg-blue-200 hover:text-blue-600">Submit</button>
            }
        </>
    );
}

export default FormButton;
