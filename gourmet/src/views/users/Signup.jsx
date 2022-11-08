import React from 'react'
import { useState } from 'react'
import { AppContext } from '../../context/app.context'
import UserValid from '../../common/enums/user-validation'
import { useContext } from 'react'

function Signup() {
    const { addToast, setAppState, ...appState } = useContext(AppContext)


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
                error: value.length < UserValid.USER_MIN ? `Minimum username lenght: ${UserValid.USER_MIN}` : `Maximum username lenght: ${UserValid.USER_MAX}`,
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
                error: value.length < 4 ? 'Minimum email lenght: 4' : 'Maximum email lenght: 32'
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
                                        <form>
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
                                                    type="button"
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Log in
                                                </button>
                                                <a className="text-gray-500" href="#!">Forgot password?</a>
                                            </div>
                                            <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 mr-2">Don't have an account?</p>
                                                <button
                                                    type="button"
                                                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                >
                                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                        <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                        </p>
                                    </div>
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