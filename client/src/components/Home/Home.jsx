import DogContainer from '../DogContainer/DogContainer';

const Home = ({ dogs }) => {
  return (
    <div>
      Home
      <DogContainer dogs={dogs} />
    </div>
  );
};
export default Home;
