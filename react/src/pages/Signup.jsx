import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useUserStore from '../store/useUserStore';

const Signup = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const naviagte = useNavigate();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: mail,
        password,
        address,
        city,
        country,
        pinCode: postalCode,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      return toast.error(data.message);
    }

    setUser(data.data);
    if (data.data.role === 'admin') {
      naviagte('/admin');
    } else {
      naviagte('/');
    }
    setLoading(false);
    toast.success(data.message);
  }

  return (
    <div
      className='bg-gray-100
    max-w-md mx-auto p-4  my-16  rounded-lg shadow-xl text-center
  '
    >
      <h1 className='text-3xl font-bold pb-4 text-gray-800'>Signup</h1>
      <form className='flex flex-col gap-2 py-2' onSubmit={handleSubmit}>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Email'
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type='password'
            className='grow'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-book-user'
          >
            <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' />
            <circle cx='12' cy='8' r='2' />
            <path d='M15 13a3 3 0 1 0-6 0' />
          </svg>
          <input
            type='text'
            className='grow'
            value={address}
            placeholder='Address'
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-bus-front'
          >
            <path d='M4 6 2 7' />
            <path d='M10 6h4' />
            <path d='m22 7-2-1' />
            <rect width='16' height='16' x='4' y='3' rx='2' />
            <path d='M4 11h16' />
            <path d='M8 15h.01' />
            <path d='M16 15h.01' />
            <path d='M6 19v2' />
            <path d='M18 21v-2' />
          </svg>
          <input
            type='text'
            className='grow'
            value={city}
            placeholder='City'
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-globe'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
            <path d='M2 12h20' />
          </svg>
          <input
            type='text'
            className='grow'
            value={country}
            placeholder='Country'
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-mail'
          >
            <path d='M22 6l-10 7L2 6' />
            <path d='M6 18h12' />
          </svg>
          <input
            type='text'
            className='grow'
            value={postalCode}
            placeholder='Postal Code'
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>

        <div className='text-left text-sm text-gray-400 hover:text-gray-800 transition'>
          <Link to='/login'>
            <p>Already have an account? </p>
          </Link>
        </div>

        <button
          className='btn btn-block btn-primary my-2 font-bold text-lg'
          type='submit'
          disabled={loading}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
