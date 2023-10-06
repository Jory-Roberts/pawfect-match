import { useState } from 'react';
import './Adoption.scss';

const Adoption = ({ dogID, userID }) => {
  const [isAdopted, setIsAdopted] = useState(false);
  const [adoptionError, setAdoptionError] = useState(null);

  const handleAdoption = async () => {
    try {
      const response = await fetch('/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dog_id: dogID, user_id: userID }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setAdoptionError(errorData);
      }
      setIsAdopted(true);
    } catch (error) {
      setAdoptionError(error);
    }
  };

  if (isAdopted) return <p>Thank you! Adoption pending. Your application is under review.</p>;

  return (
    <span className='mr-3'>
      {adoptionError && <p className='text-danger'>{adoptionError.message}</p>}
      <button
        className='btn btn-outline-primary adoption-btn'
        onClick={handleAdoption}
      >
        Adopt Me!
      </button>
    </span>
  );
};
export default Adoption;
