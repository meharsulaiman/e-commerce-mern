import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useUserStore from '../store/useUserStore';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const naviagte = useNavigate();
  const { setUser } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      return toast.error(data.message);
    }

    setUser(data.data);
    naviagte('/');
    toast.success(data.message);
    setLoading(false);
  }

  return (
    <div
      className='bg-gray-100
    max-w-md mx-auto p-4 my-40 rounded-lg shadow-xl text-center
  '
    >
      <h1 className='text-3xl font-bold pb-4 text-gray-800'>Login</h1>
      <form className='flex flex-col gap-2 py-2' onSubmit={handleSubmit}>
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

        <div className='text-left text-sm text-gray-400 hover:text-gray-800 transition'>
          <Link to='/signup'>
            <p>Don&apos;t have an account? </p>
          </Link>
        </div>

        <button
          className='btn btn-block btn-primary my-2 font-bold text-lg'
          type='submit'
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
