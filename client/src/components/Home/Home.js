import DogContainer from '../DogContainer/DogContainer';

const Home = ({ dogs }) => {
  return (
    <div>
      <h1>Meet your new match!</h1>
      <DogContainer dogs={dogs} />
    </div>
  );
};
export default Home;
