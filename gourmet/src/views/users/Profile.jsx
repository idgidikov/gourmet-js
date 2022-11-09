import React from 'react'
import { auth } from '/src/firebase/config'
import { useState } from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'

function Profile() {
    const { addToast, setAppState, ...appState } = useContext(AppContext)
    const [form, setForm] = useState({

        password: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
        confirmPassword: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },

    })
    const [updatePassword, updating, error] = useUpdatePassword(auth);

    const updateNewPassword = (value = '') => {
        // username between 10 and 60

        setForm({
            ...form,
            password: {
                value,
                touched: true,
                valid: value.length >= 4 && value.length <= 60,
                error: value.length < 4 ? 'Minimum password lenght: 4' : 'Maximum password lenght: 32'
            },
        })
    }

    const confirmPassword = (value = '') => {


        setForm({
            ...form,
            confirmPassword: {
                value,
                touched: true,
                valid: value.length >= 4 && value.length <= 60 && value === form.password.value,
                error: value.length < 4 ? 'Minimum confirmPassword lenght: 4' : 'Maximum cofirmPassword lenght: 60'
            },
        })
    }
    const editProfile = async () => {
        if (!form.password.valid) return addToast('error', 'Invalid password')
        if (!form.confirmPassword.valid) return addToast('error', 'Password does not match')
        try {
            await updatePassword(form.password.value)
            addToast('success', 'Password updated')
        }catch(err){
            addToast('error', err.message)
        }
    }
  

    return (<>
        <div>Profile</div>
        <input type="password" placeholder="Password" value={form.password.value} onChange={e => updateNewPassword(e.target.value)} />
        <br />
        <br />
       
        <input type="password" placeholder="Confirm Password" value={form.confirmPassword.value} onChange={e => confirmPassword(e.target.value)} />

        <br />
        <button onClick={editProfile}>
            Update Password
        </button>
    </>


    )
}

export default Profile

