import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import { toast } from 'react-hot-toast';
import UserInfo from '../components/UserInfo';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import { format } from 'date-fns';

const Profile = () => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  console.log(user);

  const [profile, setProfile] = useState(
    () =>
      user?.avatar?.url ||
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
  );

  const profilePicUpdate = async (file) => {
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append('file', file.target.files[0]);

      const response = await fetch('/api/v1/user/updatepic', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return toast.error(data.message);
      }

      setUser({ ...user, avatar: data.avatar });
      setLoading(false);
      setProfile(data.avatar.url);
    } catch (error) {
      setLoading(false);
    }
  };

  const { data, isLoading } = useQuery('order', async () => {
    const response = await fetch('/api/v1/order/my');
    const data = await response.json();
    return data.orders;
  });

  if (isLoading) return <Loader />;

  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <h1 className='text-3xl font-semibold'>Profile</h1>
      <div className='bg-gray-100  shadow-sm rounded-lg  hover:shadow-md transition flex flex-col gap-y-2'>
        <label
          className='form-control mx-auto mt-4 cursor-pointer'
          id='file-input-ghost'
        >
          <div className='avatar'>
            <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src={profile} />
            </div>
          </div>
          <input
            type='file'
            className='file-input file-input-ghost w-full max-w-xs hidden'
            name='file-input-ghost'
            onChange={profilePicUpdate}
            disabled={loading}
          />
        </label>

        <UserInfo />
      </div>

      <h1 className='text-3xl font-semibold mt-4'>Orders</h1>
      <div className='bg-gray-100  shadow-sm rounded-lg  hover:shadow-md transition flex flex-col gap-y-2'>
        {data &&
          data.map((order) => (
            <div
              key={order._id}
              className='p-4 border-b flex sm:items-center gap-y-2 justify-between flex-col sm:flex-row'
            >
              <div>
                <h1 className='font-semibold'>Order ID: {order._id}</h1>
                <p className='text-neutral-600 font-medium'>
                  Total: ${order.totalAmount}
                </p>
                <p className='text-neutral-600 font-medium'>
                  Status: {order.orderStatus}
                </p>
              </div>
              <div className='text-sm flex flex-col gap-2'>
                <p>Created Date: {format(order.createdAt, 'yyyy-MM-dd')}</p>
                {order.deliveredAt && (
                  <p>
                    Delivery Date: {format(order.deliveredAt, 'yyyy-MM-dd')}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
