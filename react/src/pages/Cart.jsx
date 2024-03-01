import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MoveRight } from 'lucide-react';
import CartItem from './CartItem';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  function moveCheckout() {
    if (cart.items.length === 0) {
      return toast.error('Your cart is empty');
    }

    navigate('/checkout');
  }

  return (
    <>
      <CartItem />
      <div className='flex items-center justify-between flex-col sm:flex-row'>
        <div className='stats stats-vertical lg:stats-horizontal shadow mt-2 w-full sm:w-fit'>
          <div className='stat'>
            <div className='stat-title'>Total Amount</div>
            <div className='stat-value'>
              $
              {cart.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </div>
            <div className='stat-desc'>Shipping charges and GST excluded</div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Total Items</div>
            <div className='stat-value'>
              {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
            <div className='stat-desc'>↗︎ You can add more</div>
          </div>
        </div>

        <div>
          <button
            className='btn btn-primary w-full mt-2'
            onClick={moveCheckout}
          >
            Checkout <MoveRight />
            {/* <Link to='/checkout' className='btn btn-primary w-full mt-2'>
              Checkout <MoveRight />
            </Link> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
