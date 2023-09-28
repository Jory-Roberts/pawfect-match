import DogCard from '../DogCard/DogCard';

const DogContainer = ({ dogs }) => {
  return (
    <div>
      DogContainer
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
        />
      ))}
    </div>
  );
};
export default DogContainer;
