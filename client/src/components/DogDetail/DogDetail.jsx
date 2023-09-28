import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DogDetail = () => {
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
  });

  const { id, name, breed, age, gender, description, image_url } = dog;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <li id={id}>
        <h1>{name}</h1>
        <div>
          <h3>Breed: </h3>
          <p>{breed}</p>
          <h3>Age: </h3>
          <p>{age}</p>
          <h3>Gender: </h3>
          <p>{gender}</p>
          <h3>Description: </h3>
          <p>{description}</p>
        </div>
        <img
          src={image_url}
          alt={name}
        ></img>
        <h2>Reviews: </h2>
        <button>Adopt Me!</button>
        <button>Come See Me!</button>
        <button>Rating</button>
      </li>
    </div>
  );
};
export default DogDetail;
