// components/cardFeatures.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, increaseQty, decreaseQty } from '../redux/productSlice';

const CardFeatures = ({ image, name, price, loading, id, category }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.product.cartItem.find(item => item._id === id));

    const handleAddToCart = () => {
        dispatch(addCartItem({ _id: id, name, price, category, image }));
    };

    const handleIncreaseQty = () => {
        dispatch(increaseQty(id));
    };

    const handleDecreaseQty = () => {
        dispatch(decreaseQty(id));
    };

    return (
        <div className='bg-white w-full min-w-[180px] max-w-[180px] drop-shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-center items-center py-3'>
            {image ? (
                <>
                    <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                        <div className='h-28 flex flex-col justify-center'>
                            <img src={image} alt={name} className='h-full' />
                        </div>
                        <h1 className='text-black pt-3'>{name}</h1>
                        <p className='text-black font-semibold '>
                            <span className='text-red-600 pr-1'>₹</span><span>{price}</span>
                        </p>
                    </Link>
                    {cartItem ? (
                        <div className='flex items-center'>
                            <button className='bg-red-500 w-8 rounded-md hover:bg-red-600 py-1' onClick={handleDecreaseQty}>-</button>
                            <span className='mx-2'>{cartItem.qty}</span>
                            <button className='bg-red-500 w-8 rounded-md hover:bg-red-600 py-1' onClick={handleIncreaseQty}>+</button>
                        </div>
                    ) : (
                        <button className='bg-red-500 w-32 rounded-md hover:bg-red-600 py-1' onClick={handleAddToCart}>Add Cart</button>
                    )}
                </>
            ) : (
                <p className='flex justify-center min-h-[150px] items-center'>{loading}</p>
            )}
        </div>
    );
};

export default CardFeatures;
