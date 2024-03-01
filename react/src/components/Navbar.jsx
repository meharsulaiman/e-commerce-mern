import useUserStore from '../store/useUserStore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { cart } = useCart();

  async function logout() {
    const response = await fetch('/api/v1/user/logout');
    const data = await response.json();
    if (response.ok) {
      setUser(null);
      navigate('/login');
      toast.success(data.message);
    }
  }

  return (
    <div className='navbar bg-base-100 gap-2'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' to={'/'}>
          daisyUI
        </Link>
      </div>

      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='badge badge-sm indicator-item'>
                {cart?.items?.length || 0}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow'
          >
            <div className='card-body'>
              <span className='font-bold text-lg'>
                {cart?.items?.length ? cart?.items?.length : 0} Items
              </span>
              <span className='text-info'>
                Subtotal: $
                {cart?.items?.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                ) || 0}
              </span>
              <div className='card-actions'>
                <Link to={'/cart'} className='btn btn-primary btn-block'>
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src={user?.avatar?.url}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link className='justify-between' to='/profile'>
                Profile
                <span className='badge'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/settings'>Settings</Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to='/admin'>Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
