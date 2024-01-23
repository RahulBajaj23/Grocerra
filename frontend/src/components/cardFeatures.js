import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CardFeatures = ({ image, name, price, loading, id, category }) => {
    const dispatch = useDispatch()
    const handleAddtoCart = (e) => {

        dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image
        }))
    }
    return (
        <div className='bg-white w-full min-w-[180px] max-w-[180px] drop-shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-center items-center py-3'>
            {
                image ? <>
                    <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}> <div className='h-28 flex flex-col justify-center'>
                        <img src={image} alt='' className='h-full' />
                    </div>
                        <h1 className='text-black pt-3'>{name}</h1>
                        <p className='text-black  font-semibold '><span className='text-red-600 pr-1'>₹</span><span>{price}</span></p>
                    </Link>
                    <button className='bg-red-500 w-32 rounded-md hover:bg-red-600 py-1 ' onClick={handleAddtoCart}>Add Cart</button>
                </>

                    :
                    <p className='flex justify-center min-h-[150px] items-center'>{loading}</p>
            }


        </div>
    )
}

export default CardFeatures