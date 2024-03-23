import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../../components/Loader';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const Category = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState('');
  const [id, setId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: 'category',
    queryFn: async () => {
      const response = await fetch('/api/v1/product/categories');
      const data = await response.json();
      return data.categories;
    },
  });

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationKey: 'category',
    mutationFn: async (id) => {
      const response = await fetch(`/api/v1/product/category/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      toast.success('Product has been created');
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });

  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationKey: 'category',
    mutationFn: async (name) => {
      setId(name);
      const response = await fetch(`/api/v1/product/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: name }),
      });
      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      toast.success('Product has been created');

      document.getElementById('my_modal_category').close();

      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl sm:text-2xl font-bold'>Categories</h1>
        <button
          className='btn'
          onClick={() =>
            document.getElementById('my_modal_category').showModal()
          }
        >
          <Plus />
        </button>
      </div>
      <table className='table table-sm table-zebra'>
        <thead className='text-gray-800 font-bold text-sm'>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((category) => (
            <tr key={category._id}>
              <td>{category.category}</td>
              <td>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => mutate(category._id)}
                  disabled={isDeleting && category.name === id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id='my_modal_category' className='modal'>
        <div className='modal-box w-96 max-w-5xl'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg mb-2'>Add Category</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createCategory(category);
            }}
            className='flex flex-col justify-center items-center w-full gap-5'
          >
            <input
              type='text'
              placeholder='Category Name'
              className='input input-bordered w-full'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              className='btn btn-primary'
              type='submit'
              disabled={isCreating}
            >
              Create Category
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Category;
