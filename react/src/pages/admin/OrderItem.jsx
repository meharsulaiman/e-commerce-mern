/* eslint-disable react/prop-types */

import { useState } from 'react';
import { toast } from 'react-hot-toast';

const OrderItem = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);

  const changeStatus = async () => {
    try {
      const response = await fetch(`/api/v1/order/single/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success === false) return toast.error(data.message);
      setStatus(data.status);
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr>
      <td>{order._id}</td>
      <td className='truncate'>{order.user.name}</td>
      <td>{order.user.email}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <div className='tooltip' data-tip='click to change'>
        <td className='cursor-pointer' onClick={changeStatus}>
          {status}
        </td>
      </div>

      <td>{order.paymentMethod}</td>
      <td>{order.totalAmount}</td>
      <td>
        <button>View</button>
      </td>
    </tr>
  );
};

export default OrderItem;
