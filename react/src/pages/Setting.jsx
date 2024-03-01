import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Setting = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/v1/user/changepassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return toast.error(data.message);
    }

    toast.success(data.message);
  };

  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <h1 className='text-3xl font-semibold'>Change Password</h1>

      <form
        onSubmit={handleChangePassword}
        className='bg-gray-100 shadow-sm rounded-lg hover:shadow-md transition 
      flex flex-col items-center 
      md:flex-row p-4 my-1 gap-y-2 md:gap-x-2'
      >
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Previous Password</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>New Password</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <button
          className='btn btn-primary w-2/6 md:w-auto md:mt-9'
          type='submit'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Setting;
