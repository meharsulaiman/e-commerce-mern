import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const Card = ({ product }) => {
  return (
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
        <div className='card-actions justify-end'>
          <Link className='btn btn-primary' to={`/product/${product._id}`}>
            More Info!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
