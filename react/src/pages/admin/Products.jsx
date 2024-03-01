import { Plus } from 'lucide-react';
import SelectCategory from '../../components/SelectCategory';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import AllProducts from './components/AllProducts';
import { useMutation, useQueryClient } from 'react-query';

const Products = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('stock', data.stock);
      formData.append('file', data.file);

      const response = await fetch('/api/v1/product/new', {
        method: 'POST',
        body: formData,
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      return resData;
    },
    onSuccess: () => {
      toast.success('Product has been created');
      queryClient.invalidateQueries({ queryKey: ['allProducts'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(
      { name, description, category, price, stock, file },
      {
        onSuccess: () => {
          setName('');
          setDescription('');
          setCategory('');
          setPrice('');
          setStock('');
          setFile(null);
          document.getElementById('my_modal_1').close();
        },
      }
    );
  };

  return (
    <div className='p-1 md:p-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl sm:text-2xl font-bold'>Products</h1>
        <button
          className='btn'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          <Plus />
        </button>
      </div>
      <AllProducts />
      {/* Modal 1 */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg mb-2'>Add Product</h3>

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
                  type='file'
                  className='file-input file-input-bordered w-full'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <button
              className='btn btn-primary'
              type='submit'
              disabled={isLoading}
            >
              Create Product
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Products;
