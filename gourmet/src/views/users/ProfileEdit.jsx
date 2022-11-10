import React from 'react'
import { auth } from '/src/firebase/config'
import { useState } from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { useUpdateEmail } from 'react-firebase-hooks/auth';
import UserValid from '../../common/enums/user-validation'
import { update, push, ref } from 'firebase/database'
import { db } from '/src/firebase/config'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/config.js'
import { v4 } from 'uuid'
import { ref as sRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/auth.services'
function ProfileEdit() {
    const { addToast, setAppState, user, userData } = useContext(AppContext)
    //console.log(userData.username)
    const [profilePic, setProfilePic] = useState('')

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
        confirmPassword: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },

    })
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const [updateEmail, ...rest] = useUpdateEmail(auth);
    const navigate = useNavigate()
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
    const updateNewEmail = (value = '') => {
        // username between 4 and 20

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
    const handleFile = (e) => {
        setProfilePic(prev => e.target?.files[0])
    }


    const editProfilePic = async (e) => {
        e.preventDefault();
        //console.log(profilePic);
        const imageRef = sRef(storage, `profilePics/${v4()}`)
        const file = profilePic
        try {
            const result = await uploadBytes(imageRef, file)
            console.log(result)
            const url = await getDownloadURL(result.ref)
            setProfilePic(url)
            await update(ref(db), {
                [`users/${userData.username}/profile`]: url,
            })



            addToast('success', 'Profile picture updated')
            logoutUser()
            navigate('/login')
        } catch (err) {
            addToast('error', err.message)
        }
    };



    const editProfileEmail = async () => {
        if (!form.email.valid) return addToast('error', 'Invalid email')
        try {

            await updateEmail(form.email.value)
            await update(ref(db), {
                [`users/${userData.username}/email`]: form.email.value,
            })

            addToast(
                'success', 'E-mail changed successfully'
            )
          
            logoutUser()
            navigate('/login')
        } catch (err) {
            addToast('error', err.message)
        }

    }



    const editProfilePass = async () => {

        if (!form.password.valid) return addToast('error', 'Invalid password')
        if (!form.confirmPassword.valid) return addToast('error', 'Password does not match')
        try {

            await updatePassword(form.password.value)
            addToast('success', 'Password updated')
            logoutUser()
            navigate('/login')
        } catch (err) {
            addToast('error', err.message)
        }
    }


    return (<>
        <div><h2>Edit Profile</h2></div>
        <br />
        <form action="/profile">
            <input type="file" accept='image/*' onChange={handleFile} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
            <br />
            <button className="btn btn-primary" onClick={editProfilePic} >
                Upload Photo
            </button>
        </form>

        <br />
        <br />

        <input type="password" className="input input-bordered input-primary w-full max-w-xs" placeholder="Password" value={form.password.value} onChange={e => updateNewPassword(e.target.value)} />
        <br />
        <br />

        <input type="password" className="input input-bordered input-primary w-full max-w-xs" placeholder="Confirm Password" value={form.confirmPassword.value} onChange={e => confirmPassword(e.target.value)} />

        <br />

        <button className="btn btn-primary" onClick={editProfilePass}>
            Update Password
        </button>
        <br />
        <br />
        <input type="email" className="input input-bordered input-primary w-full max-w-xs" placeholder="update email"
            value={form.email.value}
            onChange={e => updateNewEmail(e.target.value)} />

        <br />

        <button className="btn btn-primary" onClick={editProfileEmail}>
            Update Email
        </button>

    </>


    )
}
export default ProfileEdit