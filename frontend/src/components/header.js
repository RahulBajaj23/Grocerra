import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import { BiSolidUser } from 'react-icons/bi'
import { BsCart4 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'
// import { useSelector } from 'react-redux'




const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const userData = useSelector((state) => state)
    // console.log(userData);
    const userData = useSelector((state) => state.user)
    // console.log(userData.email);
    const dispatch = useDispatch()


    const handleshowMenu = () => {
        setShowMenu(preve => !preve)
    }
    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Logout successfully")
    }
    // console.log(process.env.REACT_APP_ADMIN_EMAIL);

    const cartItemNumber = useSelector((state) => state.product.cartItem)

    return (
        <header className='w-full fixed shadow-lg h-18 px-2 md:px-4 bg-white'>
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-14 '>
                        <img src={logo} className='h-full' alt='' />
                    </div>
                </Link>
                <div className=' flex items-center gap-3 md:gap-6'>
                    <nav className=' gap-3 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu/64e87c96c8806291e033e9c4"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>


                    </nav>
                    <div className='text-2xl relative cursor-pointer'>
                        <Link to={"cart"}> <BsCart4 />
                            <div className='absolute text-white bg-red-600 -top-1 text -right-1 text-sm rounded-full m-0 p-0 h-4 w-4 text-center'>
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className='' onClick={handleshowMenu}>
                        <div
                            className='text-2xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md'>
                            {userData.image ? <img src={userData.image} alt='' className='w-full h-full' /> : < BiSolidUser className='w-full' />}

                        </div>
                        {showMenu && (
                            <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col'>
                                {
                                    userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproducts"} className='whitespace-nowrap cursor-pointer'>New Products</Link>
                                }

                                {
                                    userData.email ? <p className='cursor-pointer text-red-700' onClick={handleLogout}>Logout ({userData.firstName})</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer text-blue-700'>Login</Link>
                                }
                                <nav className=' md:gap-6 text-base md:text-lg flex flex-col md:hidden'>
                                    <Link to={""}>Home</Link>
                                    <Link to={"menu/64e87c96c8806291e033e9c4"}>Menu</Link>
                                    <Link to={"about"}>About</Link>
                                    <Link to={"contact"}>Contact</Link>


                                </nav>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header