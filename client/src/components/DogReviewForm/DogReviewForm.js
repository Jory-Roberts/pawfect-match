import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

const DogReviewForm = ({ name, onReviewSubmit, reviewEdit, setReviewEdit }) => {
  const [reviewFormErrors, setReviewFormErrors] = useState({});
  const params = useParams();

  const isEditing = reviewEdit != null;

  const handleCancelEdit = () => setReviewEdit(null);

  const formSchema = yup.object({
    rating: yup
      .number()
      .positive()
      .integer()
      .required('Must enter a rating')
      .typeError('Please enter a number')
      .min(1)
      .max(5),
    comment: yup.string().required('Please enter a comment').max(255),
  });

  const formik = useFormik({
    initialValues: {
      rating: isEditing ? reviewEdit.rating : 1,
      comment: isEditing ? reviewEdit.comment : '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const API = isEditing ? `/dogs/${params.id}/reviews/${reviewEdit.id}` : `/dogs/${params.id}/reviews`;

      try {
        const response = await fetch(API, {
          method: isEditing ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const reviewData = await response.json();
          onReviewSubmit(reviewData);
          formik.resetForm();
          if (isEditing) setReviewEdit(null);
        } else {
          const formErrorData = await response.json();
          setReviewFormErrors({ message: formErrorData.message });
        }
      } catch (error) {
        setReviewFormErrors({ message: error.message });
      }
    },
  });

  return (
    <div className='container mt-5'>
      <h2>
        {isEditing ? 'Edit' : 'Leave'} a Review for {name}
      </h2>
      {reviewFormErrors.message && <p>Error: {reviewFormErrors.message}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='rating'>Rating</label>
          <input
            type='number'
            className={`form-control ${formik.touched.rating && formik.errors.rating ? `is-invalid` : ``}`}
            id='rating'
            name='rating'
            onChange={formik.handleChange}
            value={formik.values.rating}
          />
          {formik.touched.rating && formik.errors.rating && (
            <div className='invalid-feedback'>{formik.errors.rating}</div>
          )}
        </div>
        <div className='form-group'>
          <label>Comment</label>
          <input
            type='string'
            className={`form-control ${formik.touched.comment && formik.errors.comment ? `is-invalid` : ``}`}
            id='comment'
            name='comment'
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className='invalid-feedback'>{formik.errors.comment}</div>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-outline-primary'
        >
          Submit
        </button>
        {isEditing && (
          <button
            type='button'
            className='btn btn-outline-primary'
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};
export default DogReviewForm;
