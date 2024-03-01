import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      const category = searchParams.get('category') || '';
      const response = await fetch(`/api/v1/product/all?category=${category}`);
      const data = await response.json();
      setProducts(data.products);
    }

    fetchData();
  }, [searchParams]);

  return (
    <>
      <Filter />
      <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-1 mb-5'>
        {products?.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
