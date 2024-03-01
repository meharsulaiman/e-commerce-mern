import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();

  return (
    <div className='drawer-side'>
      <label
        htmlFor='my-drawer-2'
        aria-label='close sidebar'
        className='drawer-overlay'
      ></label>
      <ul className='menu p-4 w-64 min-h-full bg-base-200 text-base-content'>
        <li>
          <Link
            to='/admin/products'
            className={location.pathname === '/admin/products' ? 'active' : ''}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to='/admin/orders'
            className={location.pathname === '/admin/orders' ? 'active' : ''}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to='/admin/category'
            className={location.pathname === '/admin/category' ? 'active' : ''}
          >
            Category
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
