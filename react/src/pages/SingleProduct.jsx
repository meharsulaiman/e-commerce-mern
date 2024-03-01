import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [count, setCount] = useState(1);
  const { cart, dispatch } = useCart();

  console.log(cart);

  const { isLoading, data } = useQuery({
    queryKey: [productId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/v1/product/single/${productId}`);
        const data = await response.json();
        return data.product;
      } catch (error) {
        throw new Error('Error fetching product details');
      }
    },
  });

  const AddToCart = () => {
    if (count === 0) {
      return toast.error('Please select quantity');
    }

    if (cart.items.some((item) => item._id === data._id)) {
      return toast.error('Product already added to cart');
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...data, quantity: count } });
    toast.success('Product added to cart');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='bg-gray-200 min-h-52 px-2 py-5 sm:px-5 sm:py-10 rounded-lg flex flex-col sm:flex-row gap-2 items-center'>
      <div className='flex-1 h-96'>
        <img
          src={data.images[0].url}
          alt=''
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='flex-1'>
        <div className=' sm:max-w-96 sm:mx-auto'>
          <h1 className='text-3xl font-bold truncate'>{data.name}</h1>
          <p className='text-sm mb-2 text-wrap text-ellipsis overflow-hidden'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi totam
            cupiditate sequi delectus a atque at, aliquid, saepe, voluptates
            laborum reprehenderit veritatis doloremque est error repellat rerum
            magnam nesciunt dolore.
          </p>

          <div className='my-1 flex items-center justify-between'>
            <div className='badge badge-primary badge-lg'>
              {data.category.category}
            </div>

            <div>
              Price:{' '}
              <span className='font-bold text-gray-600'>${data.price}</span>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 mt-5'>
              <span className='font-bold'>Qty: </span>
              <button
                onClick={() => setCount((c) => (c === 0 ? 0 : c - 1))}
                className='btn btn-circle btn-sm'
              >
                <Minus />
              </button>
              <span className='text-2xl'>{count}</span>
              <button
                onClick={() => setCount((c) => (c < data.stock ? c + 1 : c))}
                className='btn btn-circle btn-sm'
              >
                <Plus />
              </button>
            </div>

            <button className='btn btn-primary btn-sm mt-5' onClick={AddToCart}>
              <ShoppingCart />
              Add to cart
            </button>
          </div>

          <div className='mt-5'>
            Stock: <span className='font-bold'>{data.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
