import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
    const { filterby } = useParams()
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const productData = useSelector(state => state.product.productList)

    const productDisplay = productData.filter(el => el._id === filterby)[0]
    console.log(productDisplay);
    const handleAddtoCart = (e) => {

        dispatch(addCartItem(productDisplay))
    }
    const handleBuy=()=>{
        dispatch(addCartItem(productDisplay))
        navigate("/cart")
    }

    return (
        <div className='p-2 md:p-4'>
            <div className='w-full max-w-4xl bg-blue-100 m-auto md:flex'>
                <div className=' max-w-xs w-full p-3 shadow overflow-hidden'>
                    <img src={productDisplay.image} alt='' className='hover:scale-105 transition-all h-full' />
                </div>
                <div className='flex flex-col gap-1 m-2'>
                    <h1 className='text-black  text-2xl font-semibold md:text-4xl'>{productDisplay.name}</h1>
                    <h1 className='text-black md:text-2xl'>{productDisplay.category}</h1>

                    <p className='text-black font-semibold md:text-2xl'><span className='text-red-600 pr-1 md:text-2xl'>₹</span><span>{productDisplay.price}</span></p>
                    <div className='flex gap-3'>
                        <button onClick={handleBuy} className='bg-red-500  rounded-md hover:bg-red-600 min-w-[100px]'>Buy</button>
                        <button onClick={handleAddtoCart} className='bg-red-500  rounded-md hover:bg-red-600 min-w-[100px]'>Add Cart</button>
                    </div>
                    <div>
                        <p className='text-black md:text-md'><span className=' text-base text-slate-600'>Description:</span><br />{productDisplay.description}</p>
                    </div>



                    {/* <p className='justify-center text-black items-center h-full flex'>{loading}</p> */}
                </div>
            </div>
            <AllProducts header={"Related Products"} />
        </div>
    )
}

export default Menu