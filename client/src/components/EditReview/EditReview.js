const EditReview = ({ review, setReviewEdit }) => {
  const handleEditReview = () => setReviewEdit(review);
  return (
    <div>
      <button onClick={handleEditReview}>EditReview</button>
    </div>
  );
};
export default EditReview;
