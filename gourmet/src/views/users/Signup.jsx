import React from 'react'
import { useState } from 'react'
import { AppContext } from '../../context/app.context'
import UserValid from '../../common/enums/user-validation'
import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {createUser, getUser} from '../../services/users.services'
import{registerUser,loginUser} from '../../services/auth.services'


function Signup() {
    //const [formRole, setFormRole] = useState('login')
    const { addToast, setAppState, ...appState } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

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
        confirmPassword: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
        name: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        },
        last: {
            value: '',
            touched: false,
            valid: false,
            error: '',
        }
    })
    const updateUsername = (value = '') => {
        // username between 4 and 20

        setForm({
            ...form,
            username: {
                value,
                touched: true,
                valid: value.length >= UserValid.USER_MIN && value.length <= UserValid.USER_MAX,
                error: value.length < UserValid.USER_MIN ? `Minimum username length: ${UserValid.USER_MIN}` : `Maximum username length: ${UserValid.USER_MAX}`,
            },
        })
    }
    const updateEmail = (value = '') => {
        // username between 4 and 20

        setForm({
            ...form,
            email: {
                value,
                touched: true,
                valid: value.length >= 4 && value.length <= 32,
                error: value.length < 4 ? 'Minimum email length: 4' : 'Maximum email length: 32'
            },
        })
    }
    const updatePassword = (value = '') => {
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
    const UpdateName = (value = '') => {
        setForm({
            ...form,
            name: {
                value,
                touched: true,
                valid: value.length >= 4 && value.length <= 60,
                error: value.length < 4 ? 'Minimum name lenght: 4' : 'Maximum name lenght: 60'
            }
        })
    }

    const UpdateLastName = (value = '') => {
        setForm({
            ...form,
            last: {
                value,
                touched: true,
                valid: value.length >= 4 && value.length <= 60,
                error: value.length < 4 ? 'Minimum last lenght: 4' : 'Maximum last lenght: 60'
            }
        })
    }

    const register = async (e) => {
        e.preventDefault()

    if (!form.username.valid) return addToast('error', 'Invalid email')
    if (!form.email.valid) return addToast('error', 'Invalid email')
    if (!form.password.valid) return addToast('error', 'Invalid password')
    if (!form.confirmPassword.valid) return addToast('error', 'Password does not match')
    if (!form.name.valid) return addToast('error', 'Invalid name')
    if (!form.last.valid) return addToast('error', 'Invalid last name')
    try {
        const user = await getUser(form.username.value)

        if (user !== null) return addToast('error', `User with username ${form.username.value} already exists!`)

        const credentials = await registerUser(form.email.value, form.password.value)

        try {
          const userData = await createUser(credentials.user.uid, form.username.value)

          setAppState({
            ...appState,
            userData,
          })
        } catch (e) {
          return addToast('error', e.message)
        }

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
          console.log(error)
        }
      } catch (error) {
        if (error.message.includes('auth/email-already-in-use')) {
          return addToast('error', 'This email has already been registered!')
        }

        addToast('error', 'Something went wrong')
      }
    

    
}


    return (
        <div className=''>
            <div className="container py-12 px-6 h-full ">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-primary shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <div className="md:p-12 md:mx-6">
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src=''
                                                alt="logo"
                                            />
                                            <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">We are The Gourmet Team</h4>
                                        </div>
                                        <form >
                                            <p className="mb-4">Please login to your account</p>
                                            <div className="mb-4">
                                                <input
                                                    value={form.username.value}
                                                    onChange={e => updateUsername(e.target.value)}
                                                    type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="username"
                                                    placeholder="Username"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    value={form.email.value}
                                                    onChange={e => updateEmail(e.target.value)}
                                                    type="email"

                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="email"
                                                    placeholder="Email"
                                                />
                                            </div>    <div className="mb-4">
                                                <input
                                                    value={form.name.value}
                                                    onChange={e => UpdateName(e.target.value)}
                                                    type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="name"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    value={form.last.value}
                                                    onChange={e => UpdateLastName(e.target.value)}
                                                    type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="lastname"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    value={form.password.value}
                                                    onChange={e => updatePassword(e.target.value)}
                                                    type="password"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="password"
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    value={form.confirmPassword.value}
                                                    onChange={e => confirmPassword(e.target.value)}
                                                    type="password"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="passwordConfirm"
                                                    placeholder="Repeat password"
                                                />
                                            </div>
                                            <div className="text-center pt-1 mb-12 pb-1">
                                                <button
                                                    className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                    type="submit"
                                                    onClick={register}
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Register
                                                </button>
                                                <a className="text-gray-500" href="#!">Forgot password?</a>
                                            </div>
                                            <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 mr-2">You have an account?</p>
                                                <button
                                                    type="button"
                                                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Log In
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                >
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup