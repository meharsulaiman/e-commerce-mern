import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';

const CartItem = () => {
  const { cart, dispatch } = useCart();

  return (
    <div className='bg-gray-100 min-h-52 px-2 py-5 sm:px-5 sm:py-10 rounded-lg flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Cart</h1>
        {/* CLEAR CART */}
        <button
          className='btn btn-neutral btn-sm'
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          <Trash2 /> Clear Cart
        </button>
      </div>
      <ul className='space-y-1'>
        {cart?.items?.length > 0 ? (
          <>
            {cart.items.map((item) => (
              <li
                key={item._id}
                className='bg-white shadow-sm hover:shadow-md flex p-5 transition-all'
              >
                <div className='flex items-center w-full'>
                  <div className='w-1/5'>
                    <h1 className='text-lg font-bold'>{item.name}</h1>
                  </div>

                  <div className='flex items-center justify-center gap-4 text-gray-700 w-3/5'>
                    <div className='flex items-center justify-center flex-col gap-2'>
                      <p className='text-sm'>
                        <span className='font-bold'>Quantity:</span>{' '}
                        {item.quantity}
                      </p>
                      <p className='text-sm'>
                        <span className='font-bold'>Stock:</span> {item.stock}
                      </p>
                    </div>

                    <div className='flex items-center flex-col'>
                      <div className='flex items-center gap-1'>
                        <button
                          className='btn btn-circle btn-xs'
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: {
                                _id: item._id,
                                quantity: item.quantity - 1,
                              },
                            })
                          }
                        >
                          -
                        </button>
                        <button
                          className='btn btn-circle btn-xs'
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: {
                                _id: item._id,
                                quantity: item.quantity + 1,
                              },
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className='text-lg font-medium text-gray-600'>
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className='w-1/5 flex items-center justify-center'>
                    <button
                      className='btn btn-circle btn-neutral btn-sm flex items-center justify-center'
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: item._id,
                        })
                      }
                    >
                      <X />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <div className='flex items-center justify-center h-full mt-20'>
            <h1 className='text-neutral-400 text-lg'>
              {' '}
              Cart is empty. Add some items to see them here.
            </h1>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CartItem;
