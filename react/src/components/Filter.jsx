import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/v1/product/categories');
      const data = await response.json();
      setCategories(data.categories);
    }
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSearchParams({ category: e.target.value });
  };

  return (
    <div className='flex justify-center mb-2  md:justify-end'>
      <select
        className='select select-sm md:select-md select-bordered w-full max-w-xs'
        value={searchParams.get('category') || ''}
        onChange={handleCategoryChange}
      >
        <>
          <option value=''>All Products</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.category}
            </option>
          ))}
        </>
      </select>
    </div>
  );
};

export default Filter;
