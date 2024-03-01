import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Modal from 'react-modal';
import EditFormModal from './EditFormModal';

Modal.setAppElement('#root');

/* eslint-disable react/prop-types */
const AdminCard = ({ product }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  // DELETE Product Query
  const queryClient = useQueryClient();
  const { isLoading: isLoadingForDelete, mutate: deleteProduct } = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/v1/product/single/${id}`, {
        method: 'DELETE',
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      }
      return resData;
    },
    onSuccess: () => {
      toast.success('Product has been deleted');
      queryClient.invalidateQueries({ queryKey: ['allProducts'] });
    },
    onError: (err) => toast.error(err.message),
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
  };

  return (
    <>
      <div className='card w-80 bg-base-100 shadow-xl rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>
        <div className='h-56 rounded-t-xl'>
          <img
            className='rounded-t-xl h-full w-full object-cover'
            src={product.images[0].url}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://miro.medium.com/v2/resize:fit:1200/1*xAUnGJlMvI622sjInCO6Bg.gif';
            }}
          />
        </div>

        <div className='card-body'>
          <h2 className='card-title'>{product.name}</h2>
          <p>{product.description}</p>
          <div className='flex items-center justify-center w-full'>
            <p className='text-sm text-slate-600'>Price: {product.price}</p>
            <p className='text-sm text-slate-600'>Stock: {product.stock}</p>
          </div>
          <div className='card-actions justify-end'>
            <button
              className='btn btn-sm btn-warning'
              disabled={isLoadingForDelete}
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>

            <button className='btn btn-sm btn-primary' onClick={openModal}>
              Edit
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <EditFormModal product={product} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default AdminCard;
