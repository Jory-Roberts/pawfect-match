import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  const { id, name, breed, age, gender, description, image_url } = dog;

  return (
    <div>
      <li id={id}>
        <Link to={`/dogs/${id}`}>
          <div>
            <h2>{name}</h2>
            <p>{breed}</p>
            <p>{age}</p>
            <p>{gender}</p>
            <p>{description}</p>
          </div>
          <img
            src={image_url}
            alt={`${name}`}
          ></img>
        </Link>
      </li>
    </div>
  );
};
export default DogCard;
