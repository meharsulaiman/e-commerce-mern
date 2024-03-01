import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import AdminCard from './AdminCard';

const AllProducts = () => {
  const { isLoading, data, error } = useQuery('allProducts', async () => {
    const response = await fetch('/api/v1/product/admin');
    const data = await response.json();
    return data.products;
  });

  console.log(isLoading, data, error);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='w-fit mx-auto grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-1 mb-5'>
      {data.map((product) => (
        <AdminCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default AllProducts;
