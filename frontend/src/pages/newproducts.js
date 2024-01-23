import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { Imagetobase64 } from '../utility/imagetobase64'
import { toast } from 'react-hot-toast'

const Newproducts = () => {
    const [data, setdata] = useState({
        name: '',
        category: '',
        image: '',
        price: '',
        description: ''
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target

        setdata((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })
    }


    const uploadImg = async (e) => {
        const data = await Imagetobase64(e.target.files[0])
        // console.log(data)
        setdata((prev) => {
            return {
                ...prev,
                image: data
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data);
        const { name, category, image, price } = data
        if (name && category && image && price) {
            const fetchData = await fetch(`${process.env.REACT_APP_DOMAIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const resData = await fetchData.json()
            console.log(resData);
            toast(resData.message)

            setdata(() => {
                return {
                    name: '',
                    category: '',
                    image: '',
                    price: '',
                    description: ''
                }
            })
        }
        else {
            toast("fill required field")
        }


    }


    return (
        <div className='p-2'>
            <form className='w-full max-w-md m-auto flex flex-col shadow p-3 py-1 bg-white rounded-md my-1' onSubmit={handleSubmit}>
                <label htmlFor='name'>Product Name</label>
                <input type='text' name='name' value={data.name} className='px-2 py-1 focus-within:outline-blue-300 bg-slate-200 rounded-sm my-1' onChange={handleOnchange} />

                <label htmlFor='category'>Category</label>
                <select className='bg-slate-200 focus-within:outline-blue-300 px-2 py-1 rounded-sm my-1' id='category ' name='category' value={data.category} onChange={handleOnchange}>
                    <option value={'Select'}>Select</option>
                    <option value={'Fruits'}>Fruits</option>
                    <option value={'Vegetables'}>Vegetables</option>
                    <option value={'Essentials'}>Essentials</option>
                    <option value={'Icecreams'}>Icecreams</option>
                    <option value={'Dry Fruits'}>Dry Fruits</option>
                    <option value={'Cake'}>Cake</option>
                    <option value={'Healthcare'}>Healthcare</option>


                </select>

                <label htmlFor='image'>Image
                    <div className='w-full h-40 bg-slate-200 my-1 rounded flex flex-col items-center justify-center'>

                        {data.image ? <img src={data.image} className='h-full' alt='' /> : <span className='text-6xl'><BsCloudUpload /></span>}
                        <input type={'file'} id='image' onChange={uploadImg} className='hidden' accept='image/*' name='image' />
                    </div>
                </label>

                <label htmlFor='price'>Price</label>
                <input type='text' name='price' value={data.price} className='bg-slate-200 focus-within:outline-blue-300 rounded-sm px-2 py-1 my-1' onChange={handleOnchange} />

                <label htmlFor='description'>Description</label>
                <textarea rows={3} name='description' value={data.description} className='bg-slate-200 focus-within:outline-blue-300 rounded-sm my-1 resize-none' onChange={handleOnchange} />

                <button className='bg-green-500 my-2 text-white hover:bg-green-600 font-semibold text-lg drop-shadow'>Save</button>

            </form>
        </div>
    )
}

export default Newproducts