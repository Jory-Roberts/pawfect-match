import { Formik, FormikContext, useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

const DogReviewForm = ({ name, onReviewSubmit }) => {
  const [reviewFormErrors, setReviewFormErrors] = useState({});
  const params = useParams();

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
      rating: 1,
      comment: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/dogs/${params.id}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const reviewData = await response.json();
          onReviewSubmit(reviewData);
          formik.resetForm();
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
      <h2>Leave a Review for {name}</h2>
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
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default DogReviewForm;
