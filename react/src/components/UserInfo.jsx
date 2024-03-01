/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useUserStore from '../store/useUserStore';

const UserInfo = () => {
  const { user, setUser } = useUserStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [pinCode, setPinCode] = useState(user.pinCode);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reponse = await fetch('/api/v1/user/updateprofile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        address,
        city,
        country,
        pinCode,
      }),
    });

    const data = await reponse.json();

    if (!reponse.ok) {
      setLoading(false);
      return toast.error(data.message);
    }

    setUser(data.data);
    toast.success(data.message);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-gray-100  shadow-sm rounded-lg  hover:shadow-md transition flex flex-col gap-y-2'
    >
      <div className='flex flex-col w-full md:flex-row items-center justify-between md:gap-x-4 mb-2 text-center  '>
        <div className='md:flex-1 p-4 pt-0 w-full space-y-2'>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Address</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div className='divider'></div>
        <div className='md:flex-1 p-4 pt-0 w-full space-y-2'>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>City</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Country</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Postal Code</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary w-4/5 md:w-1/3  mx-auto my-4'
        disabled={loading}
      >
        Update Profile
      </button>
    </form>
  );
};

export default UserInfo;
