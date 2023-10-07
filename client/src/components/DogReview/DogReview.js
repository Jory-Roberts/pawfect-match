import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DogReviewForm from '../DogReviewForm/DogReviewForm';
import EditReview from '../EditReview/EditReview';
import DeleteReview from '../DeleteReview/DeleteReview';

const DogReview = ({ dogId, name, user }) => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [reviewErrors, setReviewErrors] = useState({});
  const [reviewEdit, setReviewEdit] = useState(null);

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

  const handleReview = (updatedReview) => {
    if (reviewEdit) {
      const newReviews = reviews.map((review) => (review.id === updatedReview.id ? updatedReview : review));
      setReviews(newReviews);
    } else {
      setReviews((prevReviews) => [...prevReviews, updatedReview]);
    }
    setReviewEdit(null);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/dogs/${params.id}/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } else {
        const deleteErrorData = await response.json();
        setReviewErrors({ message: deleteErrorData.message });
      }
    } catch (error) {
      setReviewErrors({ message: error.message });
    }
  };

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
            {user && user.id === review.user.id && (
              <>
                <EditReview
                  review={review}
                  setReviewEdit={setReviewEdit}
                />
                <DeleteReview
                  reviewId={review.id}
                  onDelete={handleDeleteReview}
                />
              </>
            )}
          </li>
        ))}
      </ul>
      <DogReviewForm
        name={name}
        onReviewSubmit={handleReview}
        reviewEdit={reviewEdit}
        setReviewEdit={setReviewEdit}
      />
    </div>
  );
};
export default DogReview;
