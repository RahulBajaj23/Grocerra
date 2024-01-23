import React, { useState } from 'react'
import loginSignupimg from '../assets/login-animation.gif'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginRedux } from '../redux/userSlice'

const Login = () => {
    const [showpass, setShowpass] = useState(false);
    const [data, setdata] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const userData = useSelector(state => state)


    const dispatch = useDispatch()

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
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const { email, password } = data
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resData = await fetchData.json()
            console.log(resData)

            toast(resData.message)

            if (resData.alert) {
                dispatch(loginRedux(resData))
                setTimeout(() => {
                    navigate("/")
                }, 1000)

            }
            console.log(userData);
        }
        else {
            toast("Please fill the required field")
        }
    }

    return (
        <div className=' w-full p-3 md:p-4'>
            <div className='w-full bg-white max-w-md m-auto flex-col p-4'>
                <div className='w-16 h-16 overflow-hidden rounded-full shadow-md m-auto'>
                    <img src={loginSignupimg} alt='' className='w-20' />.
                </div>
                <form className='w-full py-3' onSubmit={onSubmitHandler}>


                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id='email' name='email' className='bg-slate-200 mt-1 mb-2 px-2 py-1 text-black w-full rounded-md  focus-within:outline-blue-300' value={data.email} onChange={onChangeHandler} /><br />

                    <label htmlFor='password'>Password</label>
                    <div className='flex bg-slate-200 mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 rounded-md'>
                        <input type={showpass ? 'text' : 'password'} id='password' name='password' className='bg-slate-200 mt-1 text-black w-full rounded-md border-none outline-none' value={data.password} onChange={onChangeHandler} />
                        <span className='flex text-xl py-2 pr-1' onClick={handleshowpass}>{showpass ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                    </div>


                    <button type='submit' className='w-full bg-red-500 hover:bg-red-600 cursor-pointer text-center max-w-[120px] rounded-full m-auto mt-3 text-lg font-bold py-1 text-white ml-36'>Login</button>
                </form>
                <p className='text-left text-sm mt-0'>Don't have any account ? <Link to={'/signup'} className='text-red-500 underline font-semibold'>Register</Link></p>

            </div>
        </div>
    )
}

export default Login