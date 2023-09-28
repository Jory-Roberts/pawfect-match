import DogCard from '../DogCard/DogCard';

const DogContainer = ({ dogs }) => {
  return (
    <div className='container'>
      <div className='row'>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
          />
        ))}
      </div>
    </div>
  );
};
export default DogContainer;
