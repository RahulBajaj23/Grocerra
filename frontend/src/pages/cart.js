import React from 'react'
import {useSelector} from 'react-redux'
import CartProduct from '../components/cartProduct';
import cartEmpty from "../assets/empty.gif"
import {toast} from 'react-hot-toast';
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    
    const productCartItems=useSelector((state)=>state.product.cartItem)
    console.log(productCartItems);
    const user=useSelector(state=>state.user)
    console.log(user);
    const navigate=useNavigate()

    const totalPrice=productCartItems.reduce((acc,curr)=>acc+parseInt(curr.total),0)
    const totalQty=productCartItems.reduce((acc,curr)=>acc+parseInt(curr.qty),0)

    const handlePaymentGateway=async()=>{
        if (user.email){
            console.log('Stripe Public Key:', process.env.REACT_APP_STRIPE_PUBIC_KEY); // Check the value here
    
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBIC_KEY);
            console.log('Stripe Promise:', stripePromise);

        const res =await fetch(`${process.env.REACT_APP_DOMAIN}/checkout-payment`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(productCartItems)
        })

        if(res.statusCode===500)return;

        const data=await res.json()
        console.log(data);
        toast("Redirect to payment gateway...")
        stripePromise.redirectToCheckout({sessionId:data})
        }

        else{
            toast("You have not login")
            setTimeout(()=>{
            navigate("/login")
            },1000)
        }
        
            
    }
    return (
        <>
        <div className='p-2 md:p-4'>
            <h1 className=' font-semibold text-slate-700 text-lg md:text-2xl'>Your Cart items</h1>
            {productCartItems[0]?

            <div className='my-2 md:my-4 flex gap-3'>
                {/* display cart items */}
                <div className=' w-full max-w-3xl'>
                    {
                        productCartItems.map(el=>{
                            return(
                                <CartProduct
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                                qty={el.qty}
                                total={el.total}
                                />
                            )
                        })
                    }
                </div>
                <div className='w-full max-w-md ml-auto'>
                    <h3 className=' bg-blue-600 text-center text-lg p-2 font-semibold text-white'>Summary</h3>
                    <div className='flex w-full border-2 py-2 text-lg'>
                        <p>Total Qty :</p>
                        <p className=' ml-auto font-bold pr-12'>{totalQty}</p>
                    </div>
                    <div className='flex w-full border-2 py-2 text-lg'>
                        <p>Total Price</p>
                        <p className='ml-auto font-bold pr-12'><span className='text-red-600'>₹</span>{totalPrice}</p>
                    </div>
                    <button className=' bg-red-600 hover:bg-red-700 w-full py-1 font-medium text-lg text-white' onClick={handlePaymentGateway}>Payment</button>
                 </div>
                 
            </div>:
            <>
            <div className='w-full flex justify-center items-center flex-col'>
                <img src={cartEmpty} alt='' className='w-full max-w-sm'/>
                <h2 className=' text-3xl text-slate-500 font-semibold'>Empty Cart</h2>
            </div>
            </>
}
        </div>
        </>
    )
}

export default Cart