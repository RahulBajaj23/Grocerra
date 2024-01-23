import Header from './components/header';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from './redux/productSlice';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)


  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_DOMAIN}/product`)
      const resData = await res.json()
      console.log(resData);
      dispatch(setData(resData))

    })()
  }, [])
  console.log(productData);
  return (
    <div >
      <Toaster />
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
