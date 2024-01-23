import React, { useState } from 'react'
import loginSignupimg from '../assets/login-animation.gif'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { Imagetobase64 } from '../utility/imagetobase64'
import { toast } from 'react-hot-toast'

const Signup = () => {
    const [showpass, setShowpass] = useState(false);
    const navigate = useNavigate()
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        Cpassword: "",
        image: ""
    })
    // console.log(data)
    const handleshowpass = () => {
        setShowpass(prev => !prev)
    }


    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleProfileImg = async (e) => {
        const data = await Imagetobase64(e.target.files[0])
        // console.log(data)

        setdata((prev) => {
            return {
                ...prev,
                image: data
            }
        })
    }

    console.log(process.env.REACT_APP_DOMAIN)
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const { firstName, lastName, email, password, Cpassword } = data
        if (firstName && lastName && email && password && Cpassword) {
            if (password === Cpassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const resData = await fetchData.json()
                // console.log(resData);

                toast(resData.message)
                if (resData.alert) {
                    navigate("/login")
                }

            }
            else {
                toast("password doesn't match")
            }
        } else {
            toast("Please fill the required field")
        }
    }

    return (
        <div className=' w-full p-3 md:p-4'>
            <div className='w-full bg-white max-w-md m-auto flex-col p-4'>
                <div className='w-20 h-20 overflow-hidden rounded-full shadow-md m-auto relative drop-shadow-md'>
                    <img src={data.image ? data.image : loginSignupimg} alt='' className='w-full h-full' />

                    <label htmlFor='profileImg'>
                        <div className='absolute bottom-0 w-full bg-slate-500 bg-opacity-50 h-1/3 text-center'>
                            <p className='text-sm cursor-pointer text-white'>Upload</p>


                        </div>
                        <input type={'file'} id='profileImg' accept='image/*' className='hidden' onChange={handleProfileImg} name='image'></input>
                    </label>
                </div>


                <form className='w-full py-3' onSubmit={onSubmitHandler}>
                    <label htmlFor='firstName'>First Name</label><br />
                    <input type={"text"} id='firstName' name='firstName' className='bg-slate-200 text-black mt-1 mb-2 w-full px-2 py-1 rounded-md  focus-within:outline-blue-300' value={data.firstName} onChange={onChangeHandler} /><br />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type={"text"} id='lastName' name='lastName' className='bg-slate-200 mt-1 mb-2 px-2 py-1 text-black w-full rounded-md  focus-within:outline-blue-300' value={data.lastName} onChange={onChangeHandler} /><br />

                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id='email' name='email' autoComplete='email' className='bg-slate-200 mt-1 mb-2 px-2 py-1 text-black w-full rounded-md  focus-within:outline-blue-300' value={data.email} onChange={onChangeHandler} /><br />

                    <label htmlFor='password'>Password</label>
                    <div className='flex bg-slate-200 mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 rounded-md'>
                        <input type={showpass ? 'text' : 'password'} id='password' name='password' className='bg-slate-200 mt-1 text-black w-full rounded-md border-none outline-none' value={data.password} onChange={onChangeHandler} />
                        <span className='flex text-xl py-2 pr-1' onClick={handleshowpass}>{showpass ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                    </div>

                    <label htmlFor='Cpassword'>Confirm Password</label>
                    <div className='flex bg-slate-200 mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 rounded-md'>
                        <input type="Cpassword" id='Cpassword' name='Cpassword' className='bg-slate-200 text-black w-full px-2 py-1  rounded-md border-none outline-none' value={data.Cpassword} onChange={onChangeHandler} />

                    </div>
                    <button type='submit' className='w-full bg-red-500 hover:bg-red-600 cursor-pointer text-center max-w-[120px] rounded-full m-auto mt-3 text-lg font-bold py-1 text-white ml-36'>Signup</button>
                </form>
                <p className='text-left text-sm mt-0'>Already register ? <Link to={'/login'} className='text-red-500 underline font-semibold'>Login</Link></p>

            </div>
        </div>
    )
}

export default Signup