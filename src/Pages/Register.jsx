import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log("values", values)

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/register", values)
            console.log("response", response)

        } catch (error) {

        }

    }

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h1>Register</h1>
            <div className='flex justify-center items-center h-screen'>
                <div className='shadow-lg px-8 py-5 border w-72'>
                    <h2 className='text-lg font-bold mb-4'>Register</h2>
                    <form onSubmit={handleSumbit}>
                        <div className="mb-4">
                            <label htmlFor="username" className='block text-gray-700'>Username</label>
                            <input type="text" placeholder='Enter Username' className='w-full px-3 py-2 border'
                                name="name" onChange={handleChanges} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className='block text-gray-700'>Email</label>
                            <input type="email" placeholder='Enter Email' className='w-full px-3 py-2 border'
                                name="email" onChange={handleChanges} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className='block text-gray-700'>Password</label>
                            <input type="password" placeholder='Enter Password' className='w-full px-3 py-2 border'
                                name="password" onChange={handleChanges} />
                        </div>
                        <button className="w-full bg-green-600 text-white py-2 ">Submit</button>
                    </form>
                    <div className="text-center">
                        <span>Already have account?</span>
                        <Link to='/login' className='text-blue-500'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register