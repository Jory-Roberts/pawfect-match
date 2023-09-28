import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  const { id, name, image_url } = dog;

  return (
    <div className='col-md-3 mb-3'>
      <div className='card h-100'>
        <img
          src={image_url}
          alt={name}
          className='rounded'
        />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <Link
            to={`/dogs/${id}`}
            className='btn btn-outline-primary'
          >
            About Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
