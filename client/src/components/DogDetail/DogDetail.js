import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Adoption from '../Adoption/Adoption';
import DogReview from '../DogReview/DogReview';
import './DogDetail.scss';
import DogVisit from '../DogVisit/DogVisit';

const DogDetail = ({ user }) => {
  const [dog, setDog] = useState('');
  const [error, setError] = useState(null);

  const params = useParams();

  const fetchDog = async () => {
    try {
      const response = await fetch(`/dogs/${params.id}`);
      if (response.ok) {
        const dogData = await response.json();
        setDog(dogData);
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (err) {
      setError({ message: 'An error occurred while fetching the dog data.' });
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  const { id, name, breed, age, gender, description, image_url } = dog;

  if (error) return <h2>{error}</h2>;

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <li
          id={id}
          className='col-md-8 no-bullet'
        >
          <h1 className='text-center'>{name}</h1>

          <div className='d-flex flex-row flex-wrap justify-content-between'>
            <div className='col-md-6'>
              <h5>Breed: </h5>
              <p>{breed}</p>
              <h5>Age: </h5>
              <p>{age}</p>
              <h5>Gender: </h5>
              <p>{gender}</p>
              <h5>Description: </h5>
              <p>{description}</p>
            </div>
            <div className='col-md-6'>
              <img
                src={image_url}
                alt={name}
                className='img-fluid mb-3'
              ></img>
            </div>
          </div>

          <div className='text-center mt-3'>
            <Adoption
              dogID={id}
              userID={user}
            />
            <DogVisit
              dogID={id}
              user={user}
            />
          </div>

          <DogReview
            dogID={id}
            name={name}
            user={user}
          />
        </li>
      </div>
    </div>
  );
};

export default DogDetail;
