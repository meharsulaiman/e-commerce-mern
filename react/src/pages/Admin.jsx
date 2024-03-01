import { Outlet } from 'react-router-dom';
import { AlignJustify } from 'lucide-react';
import Menu from '../components/Menu';

const Admin = () => {
  return (
    <div>
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center justify-center'>
          <label
            htmlFor='my-drawer-2'
            className='btn btn-circle drawer-button lg:hidden self-end mr-2 mb-2'
          >
            <AlignJustify />
          </label>
          <div className='bg-base-200 w-full h-full sm:ml-2 rounded-lg'>
            <Outlet />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Admin;
