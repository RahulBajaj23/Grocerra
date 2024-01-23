import React, { useEffect, useRef, useState } from 'react'
import martManimg from '../assets/grocery-image.png'
import bikeDElivery from '../assets/motorbike-food-delivery-service-online-ordering-concept_68708-2241.avif'
import HomeCart from '../components/homeCart'
import { useSelector } from 'react-redux'
import CardFeatures from '../components/cardFeatures'
import { GrPrevious, GrNext } from 'react-icons/gr'
import FilterProduct from '../components/filterProduct'
import AllProducts from '../components/AllProducts'

const Home = () => {
    const productData = useSelector((state) => state.product.productList)
    // console.log(productData);
    const productSliceCart = productData.slice(0, 4)
    const homecartListVegetables = productData.filter(el => el.category === "Vegetables", [])
    // console.log(homecartListVegetables);

    const loadingArray = new Array(4).fill(null)
    const loadingArrayFeature = new Array(10).fill(null)

    const slideProduct = useRef()
    const nextProduct = () => {
        slideProduct.current.scrollLeft += 200
    }
    const prevProduct = () => {
        slideProduct.current.scrollLeft -= 200
    }





    return (
        <div className='w-full'>
            <div className='bg-black p-2 md:p-4 '>
                <div className=" text-white md:flex">
                    <div className='md:w-1/3 mr-20'>
                        <div className='flex gap-3 w-48 items-center bg-blue-300 rounded-md'>
                            <img src={bikeDElivery} alt='' className='h-12 rounded-md' /><p className='text-lg font-semibold text-black'>Bike delivery</p>

                        </div>
                        <h1 className=" text-4xl py-3">Groceries<br /><span className='text-red-600 '>delivery in 15 mins</span></h1>
                        <p className="pt-4">Gracify offer a wide range of products,including fresh products,meats,<br />dairy,bread
                            goods and
                            non-perishable items</p>
                        <button className='bg-green-500 hover:bg-green-600 w-28 text-center font-semibold text-lg py-1 my-10  rounded-md'>Order Now</button>
                    </div>
                    <div>
                        <img src={martManimg} className="md:w-1/2" alt=''></img>
                    </div>
                    <div className='md:w-1/3 flex flex-wrap gap-4 p-2 justify-center'>
                        {
                            productSliceCart[0] ? productSliceCart.map(el => {
                                return (
                                    <HomeCart
                                        key={el._id}
                                        id={el._id}
                                        image={el.image}
                                        name={el.name}
                                        price={el.price}
                                    />

                                )
                            }) :
                                loadingArray.map((el, index) => {
                                    return (
                                        <HomeCart
                                            key={index + "loading.."}
                                            loading={"loading..."}
                                        />
                                    )
                                })
                        }
                    </div>
                </div>

            </div>
            <div>
                <div className='m-2 flex w-full items-center'>
                    <h2 className='text-xl text-black font-semibold mb-3'>Fresh Vegetables</h2>
                    <div className='ml-auto flex gap-4 mr-2'>
                        <button onClick={prevProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>< GrPrevious /> </button>
                        <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>< GrNext /></button>
                    </div>
                </div>
                <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProduct}>
                    {homecartListVegetables[0] ? homecartListVegetables.map(el => (
                        <CardFeatures
                            key={el._id + "Vegetables"}
                            id={el._id}
                            name={el.name}
                            image={el.image}
                            price={el.price}
                        />
                    )) : loadingArrayFeature.map((el, index) => (
                        <CardFeatures key={index + "cartLoading"} loading='loading...' />
                    ))}
                </div>
            </div>
            <AllProducts header={"Your Products"} />
        </div>

    )
}

export default Home