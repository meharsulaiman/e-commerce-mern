import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import OrderItem from './OrderItem';

const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'adminOrders',
    queryFn: async () => {
      const response = await fetch('/api/v1/order/admin');
      const data = await response.json();
      return data.orders;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // data is an array of
  /* 
createdAt
: 
"2024-02-29T05:49:22.816Z"
itemPrice
: 
17000
orderItems
: 
[{name: "Charger", price: 5000, quantity: 1,…}, {name: "battery", price: 12000, quantity: 1,…}]
orderStatus
: 
"processing"
paymentMethod
: 
"ONLINE"
shippingCharges
: 
200
shippingInfo
: 
{address: "DHA III", city: "lahore", country: "pakistan", pinCode: 52160}
taxPrice
: 
3060
totalAmount
: 
20260
user
: 
"65db3a6a3b6f1b39035dbb26"
__v
: 
0
_id
: 
"65e01af3f74bf09084c6e4d5"
  */

  return (
    <div className='overflow-x-auto'>
      <h1 className='text-2xl font-bold mb-2'>Orders</h1>
      <table className='table table-sm table-zebra'>
        <thead className='text-gray-800 font-bold text-sm'>
          <tr>
            <th>Order ID</th>
            <th className='min-w-36'>Customer</th>
            <th>Contact</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
