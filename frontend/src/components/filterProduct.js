import React from 'react'
import vegetables from '../assets/vegetable-categ.jpg'

const FilterProduct = ({ category, onClick ,isActive}) => {
    return (
        <div onClick={onClick} className=' text-center'>
            <img src={vegetables} alt='' className={` rounded-full p-2 w-16 h-16 cursor-pointer ${isActive? "bg-red-600 ":" bg-white"}
            `}></img>
            <p className='text-black text-base font-semibold text-center capitalize'>{category}</p>
        </div>
    )
}

export default FilterProduct