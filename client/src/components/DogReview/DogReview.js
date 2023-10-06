import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DogReviewForm from '../DogReviewForm/DogReviewForm';

const DogReview = ({ dogId, user, name }) => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [reviewErrors, setReviewErrors] = useState({});

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/dogs/${params.id}/reviews`);
      if (response.ok) {
        const reviewData = await response.json();
        console.log(reviewData);
        setReviews(reviewData);
      } else {
        const reviewErrorData = await response.json();
        setReviewErrors({ message: reviewErrorData.message });
      }
    } catch (error) {
      setReviewErrors({ message: error.message });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dogId]);

  const renderRatingAsBones = (rating) => {
    return '🦴'.repeat(rating);
  };

  const handleReview = (newReview) => setReviews((prevReviews) => [...prevReviews, newReview]);

  return (
    <div>
      <h2>Reviews for {name}</h2>
      {reviewErrors.message && <p className='text-danger'>Error: {reviewErrors.message}</p>}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Username: {review.user.username}</strong>{' '}
            <p>
              Review: {review.comment} <p>(Rating:{renderRatingAsBones(review.rating)})</p>
            </p>
          </li>
        ))}
      </ul>
      <DogReviewForm
        name={name}
        onReviewSubmit={handleReview}
      />
    </div>
  );
};
export default DogReview;
