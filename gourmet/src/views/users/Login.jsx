import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/app.context'
import{loginUser} from '../../services/auth.services'
import {getUser} from '../../services/users.services'
import UserValid from '../../common/enums/user-validation'
function Login() {
    //const [formRole, setFormRole] = useState('login')
    const { addToast, setAppState, ...appState } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({
  
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


    const updateEmail = (value = '') => {
        

        setForm({
            ...form,
            email: {
                value,
                touched: true,
                valid: value.length >= UserValid.EMAIL_MIN_LENGTH && value.length <= UserValid.EMAIL_MAX_LENGTH,
                error: value.length < UserValid.EMAIL_MIN_LENGTH ? `Minimum email length: ${UserValid.EMAIL_MIN_LENGTH}` : `Maximum email length: ${UserValid.EMAIL_MAX_LENGTH}`
            },
        })
    }

 

    const updatePassword = (value = '') => {
        

        setForm({
            ...form,
            password: {
                value,
                touched: true,
                valid: value.length >= UserValid.PASS_MIN_LENGTH && value.length <= UserValid.PASS_MAX_LENGTH,
                error: value.length < UserValid.PASS_MIN_LENGTH ? `Minimum password length: ${UserValid.PASS_MIN_LENGTH}` : `Maximum password length: ${UserValid.PASS_MAX_LENGTH}`
            },
        })
    }

    const login = async (e) => {
        e.preventDefault()
        if(!form.email.valid  ) return addToast('error', 'Invalid email')
        
        if (!form.password.valid) return addToast('error', 'Invalid password')


        try {

     
            
            const credentials = await loginUser(form.email.value, form.password.value)

            setAppState({
                ...appState,
                user: {
                    email: credentials.user.email,
                    uid: credentials.user.uid,
                }
            })
            addToast('success', 'You have been logged!')
            navigate('/')
        } catch (error) {
            addToast('error', 'Something went wrong')
        }

    }


    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src="https://officialbespoke.co/wp-content/uploads/2016/08/2015_11_08-HIE-Photo-Massimo-Press-59.jpg" alt="" />
            </div>

            <div className='bg-gray-500 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white-p-4' action="">
                    <h2 className='text-4xl font-bold text-center py-6'>BRAND</h2>
                    <div className='flex flex-col py-2'>
                        <label htmlFor="">Email</label>
                        <input

                            value={form.email.value}
                            onChange={e => updateEmail(e.target.value)} 
                            className='border p-2 bg-black' type="text" />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label htmlFor="">Password</label>
                        <input
                        value={form.password.value}
                        onChange={e => updatePassword(e.target.value)} 
                         className='border p-2  bg-black' type="password" />
                    </div>
                    <button onClick = {login} className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign in</button>
                    <div className='flex justify-between'>
                        <p className='flex items-center mr-2'><input className='mr-2' type="checkbox" />Remember me</p>
                        <Link to='/sign-up'>Create an account</Link>
                    </div>
                </form>
            </div>


        </div>

    )
}

export default Login