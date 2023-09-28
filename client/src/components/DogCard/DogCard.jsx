import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  const { id, name, image_url } = dog;
  console.log(`Image: ${image_url}`);

  return (
    <div>
      <li id={id}>
        <Link to={`/dogs/${id}`}>
          <div>
            <h2>{name}</h2>
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
