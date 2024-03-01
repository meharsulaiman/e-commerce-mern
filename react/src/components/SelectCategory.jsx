/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const SelectCategory = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/v1/product/categories');
      const data = await response.json();
      setCategories(data.categories);
    }
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <select
      className='select select-bordered w-full self-center'
      value={category}
      onChange={handleCategoryChange}
    >
      <>
        <option value='' disabled>
          Select Category
        </option>
        {categories.map((item) => (
          <option key={item._id} value={item._id}>
            {item.category}
          </option>
        ))}
      </>
    </select>
  );
};

export default SelectCategory;
