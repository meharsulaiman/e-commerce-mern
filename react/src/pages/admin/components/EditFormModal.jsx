/* eslint-disable react/prop-types */

import { useState } from 'react';
import SelectCategory from '../../../components/SelectCategory';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';

const EditFormModal = ({ product, closeModal }) => {
  // UPDATE Product State
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category._id);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const queryClient = useQueryClient();

  // UPDATE Product Query
  const { isLoading: loadingForEdit, mutate } = useMutation({
    mutationFn: async ({ name, description, category, price, stock }) => {
      const response = await fetch(`/api/v1/product/single/${product._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          description,
          category,
          price,
          stock,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      return resData;
    },
    onSuccess: () => {
      toast.success('Product has been updated');
      queryClient.invalidateQueries({ queryKey: ['allProducts'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutate(
        { name, description, category, price, stock },
        {
          onSuccess: () => {
            setName('');
            setDescription('');
            setCategory('');
            setPrice('');
            setStock('');
            closeModal();
          },
        }
      );
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error('Failed to update product');
    }
  };

  console.log(category);

  return (
    <div>
      <div className='w-11/12 max-w-5xl'>
        <button
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          onClick={closeModal}
        >
          ✕
        </button>

        <h3 className='font-bold text-lg mb-2'>Edit Product</h3>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center w-full gap-5'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full place-items-center gap-2 md:gap-10'>
            {/* SIDE 1 */}
            <div className='space-y-2 '>
              <input
                type='text'
                placeholder='Name'
                className='input input-bordered w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='text'
                placeholder='Description'
                className='input input-bordered w-full'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <SelectCategory setCategory={setCategory} category={category} />
            </div>
            {/* SIDE 2 */}
            <div className='space-y-2'>
              <input
                type='text'
                placeholder='Price'
                className='input input-bordered w-full'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type='text'
                placeholder='Stock'
                className='input input-bordered w-full'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                type='text'
                placeholder='Stock'
                className='input input-bordered w-full opacity-0'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          <button
            className='btn btn-primary'
            type='submit'
            disabled={loadingForEdit}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFormModal;
