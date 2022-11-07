import React from 'react'
import { useState } from 'react'

function Login() {


    const [form, setForm] = useState({
        username: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
        email: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
        password: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
    })

    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
             <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src="https://officialbespoke.co/wp-content/uploads/2016/08/2015_11_08-HIE-Photo-Massimo-Press-59.jpg" alt="" />
            </div>

            <div className='bg-gray-500 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white-p-4' action="">
                    <h2 className='text-4xl font-bold text-center py-6'>BRAND</h2>
                    <div className='flex flex-col py-2'>
                        <label htmlFor="">Username</label>
                        <input className='border p-2' type="text" />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label htmlFor="">Password</label>
                        <input className='border p-2' type="password" />
                    </div>
                    <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign in</button>
                    <div className='flex justify-between'>
                        <p className='flex items-center mr-2'><input className='mr-2' type="checkbox" />Remember me</p>
                        <p>Create an account</p>
                    </div>
                </form>
            </div>
           

        </div>

    )
}

export default Login