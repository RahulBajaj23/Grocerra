import React, { useState, useEffect } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { Imagetobase64 } from '../utility/imagetobase64';
import { toast } from 'react-hot-toast';

const Newproducts = () => {
    const [data, setData] = useState({
        name: '',
        category: '',
        image: '',
        price: '',
        description: ''
    });
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}/product`);
        const result = await response.json();
        setProducts(result);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImg = async (e) => {
        const data = await Imagetobase64(e.target.files[0]);
        setData((prev) => ({
            ...prev,
            image: data
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, category, image, price } = data;
        if (name && category && image && price) {
            const fetchData = await fetch(`${process.env.REACT_APP_DOMAIN}/${editMode ? `updateProduct/${editId}` : 'uploadProduct'}`, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const resData = await fetchData.json();
            toast(resData.message);
            setData({
                name: '',
                category: '',
                image: '',
                price: '',
                description: ''
            });
            fetchProducts();
            setEditMode(false);
            setEditId(null);
        } else {
            toast('Fill required fields');
        }
    };

    const handleEdit = (product) => {
        setData(product);
        setEditMode(true);
        setEditId(product._id);
    };

    const handleDelete = async (id) => {
        await fetch(`${process.env.REACT_APP_DOMAIN}/deleteProduct/${id}`, {
            method: 'DELETE'
        });
        toast('Product deleted successfully');
        fetchProducts();
    };

    return (
        <div className='p-2'>
            <form className='w-full max-w-md m-auto flex flex-col shadow p-3 py-1 bg-white rounded-md my-1' onSubmit={handleSubmit}>
                <label htmlFor='name'>Product Name</label>
                <input type='text' name='name' value={data.name} className='px-2 py-1 focus-within:outline-blue-300 bg-slate-200 rounded-sm my-1' onChange={handleOnChange} />

                <label htmlFor='category'>Category</label>
                <select className='bg-slate-200 focus-within:outline-blue-300 px-2 py-1 rounded-sm my-1' id='category' name='category' value={data.category} onChange={handleOnChange}>
                    <option value='Select'>Select</option>
                    <option value='Fruits'>Fruits</option>
                    <option value='Vegetables'>Vegetables</option>
                    <option value='Essentials'>Essentials</option>
                    <option value='Icecreams'>Icecreams</option>
                    <option value='Dry Fruits'>Dry Fruits</option>
                    <option value='Cake'>Cake</option>
                    <option value='Healthcare'>Healthcare</option>
                </select>

                <label htmlFor='image'>Image
                    <div className='w-full h-40 bg-slate-200 my-1 rounded flex flex-col items-center justify-center'>
                        {data.image ? <img src={data.image} className='h-full' alt='' /> : <span className='text-6xl'><BsCloudUpload /></span>}
                        <input type='file' id='image' onChange={uploadImg} className='hidden' accept='image/*' name='image' />
                    </div>
                </label>

                <label htmlFor='price'>Price</label>
                <input type='text' name='price' value={data.price} className='bg-slate-200 focus-within:outline-blue-300 rounded-sm px-2 py-1 my-1' onChange={handleOnChange} />

                <label htmlFor='description'>Description</label>
                <textarea rows={3} name='description' value={data.description} className='bg-slate-200 focus-within:outline-blue-300 rounded-sm my-1 resize-none' onChange={handleOnChange} />

                <button className='bg-green-500 my-2 text-white hover:bg-green-600 font-semibold text-lg drop-shadow'>{editMode ? 'Update' : 'Save'}</button>
            </form>

            <div className='mt-5'>
                <h2 className='text-xl font-bold'>Products List</h2>
                {products.map((product) => (
                    <div key={product._id} className='border p-2 my-2 flex justify-between items-center'>
                        <div>
                            <h3 className='font-bold'>{product.name}</h3>
                            <p>{product.category}</p>
                            <p>{product.price}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(product)} className='bg-blue-500 text-white px-3 py-1 rounded mr-2'>Edit</button>
                            <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Newproducts;
