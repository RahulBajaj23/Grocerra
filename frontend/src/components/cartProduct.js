import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CartProduct = ({id,price,name,category,image,qty,total}) => {
  const dispatch=useDispatch()
  return (
    <div className=' bg-slate-200 p-2 flex gap-3 border border-slate-300 rounded'>
      <div className='p-2 rounded-md overflow-hidden bg-white'>
        <img src={image} alt='' className=' w-40 h-28 hover:scale-100 transition-all cursor-pointer object-cover'/>

      </div>
      <div className='flex flex-col gap-1 m-2 w-full'>
        <div className='flex justify-between'>
                    <h1 className='text-black  text-lg font-semibold md:text-xl'>{name}</h1>
                    <div onClick={()=>dispatch(deleteCartItem(id))} className=' text-lg cursor-pointer text-red-700 hover:text-red-900'><AiFillDelete/></div>
                    </div>
                    <h1 className='text-black md:text-2xl'>{category}</h1>

                    <p className='text-black font-semibold md:text-lg'><span className='text-red-600 pr-1 md:text-xl'>₹</span><span>{price}</span></p>
                  <div className='flex justify-between'>
                  <div className='flex gap-3 items-center font-semibold'>
                        <button  className='bg-red-500  rounded-md hover:bg-red-600 min-w-[30px] text-lg' onClickCapture={()=>dispatch(increaseQty(id))}>+</button>
                        <p>{qty}</p>
                        <button  className='bg-red-500  rounded-md hover:bg-red-600 min-w-[30px] text-lg' onClick={()=>dispatch(decreaseQty(id))}>-</button>
                    </div>
                    <div className='flex items-center gap-2 font-semibold text-slate-700'>Total:<p><span className=' text-red-700'>₹</span>{total}</p></div>
                    
                  </div>
                   
                   



                   
                </div>

    </div>
  )
}

export default CartProduct