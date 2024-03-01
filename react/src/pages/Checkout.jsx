import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';
import useUserStore from '../store/useUserStore';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const items = cart.items;
  const shippingInfo = {
    address: user.address,
    city: user.city,
    country: user.country,
    pinCode: user.pinCode,
  };
  const paymentInfo = '';
  const itemPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = 200;
  const tax = 0.18 * itemPrice;
  const totalAmount = itemPrice + shippingCharges + tax;

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.id);
  };

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/v1/order/new', {
        method: 'POST',
        body: JSON.stringify({
          orderItems: data.items,
          shippingInfo: data.shippingInfo,
          paymentInfo: data.paymentInfo,
          itemPrice: data.itemPrice,
          shippingCharges: data.shippingCharges,
          taxPrice: data.tax,
          totalAmount: data.totalAmount,
          paymentMethod: paymentMethod,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      return resData;
    },
    onSuccess: () => {
      toast.success('Product has been created');
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const CreateOrder = async () => {
    if (items.length === 0) {
      return toast.error('Cart is empty, add some items first');
    }

    mutate(
      {
        items,
        shippingInfo,
        paymentInfo,
        itemPrice,
        shippingCharges,
        tax,
        totalAmount,
      },
      {
        onSuccess: () => {
          dispatch({ type: 'CLEAR_CART' });
          toast.success('Order has been created');
          // NAvigate
          navigate('/profile');
        },
      }
    );
  };

  return (
    <div className='max-w-4xl mx-auto mt-4 mb-20'>
      <h1 className='text-3xl font-semibold'>Shipping Info</h1>
      <div>
        <div className='flex flex-col w-full border-opacity-50'>
          <div className='card bg-base-300 rounded-box'>
            <UserInfo />
          </div>
          <div className='divider'>AND</div>
          <div className='card bg-base-300 rounded-box'>
            <CartItem />
          </div>
          <div className='divider'>AND</div>
          <div className='card bg-gray-100 rounded-box px-2 py-5'>
            <div className='flex flex-col'>
              <h1 className='text-3xl font-bold'>Payment</h1>
              <div className='px-4 py-2'>
                <div className='text-gray-500'>
                  <input
                    type='radio'
                    id='ONLINE'
                    name='payment'
                    checked={paymentMethod === 'ONLINE'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor='ONLINE' className='ml-2'>
                    Credit Card
                  </label>
                </div>
                <div className='text-gray-500'>
                  <input
                    type='radio'
                    id='COD'
                    name='payment'
                    checked={paymentMethod === 'COD'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor='COD' className='ml-2'>
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='divider'>AND</div>
          <div className='card bg-gray-100 rounded-box px-2 py-5'>
            <div className='flex flex-col'>
              <h1 className='text-3xl font-bold'>Expenses</h1>
              <div className='text-sm mt-2 px-2'>
                <p>Actual Price: {itemPrice}</p>
                <p>ShippingFee: {shippingCharges}</p>
                <p>GST: {tax}</p>
                <p>Total Payable: {totalAmount}</p>
              </div>
            </div>

            <div className='flex justify-end mt-4 mr-2'>
              {paymentMethod === 'COD' ? (
                <button
                  className='btn btn-md btn-primary'
                  onClick={CreateOrder}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className='loading loading-spinner loading-xs'></span>
                  )}
                  Order Confirm
                </button>
              ) : (
                <Link to='/checkout/payment' className='btn btn-md btn-primary'>
                  Pay Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
