import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const NewDogForm = () => {
  const [newDog, setNewDog] = useState([{}]);
  const [newDogError, setNewDogError] = useState([]);

  useEffect(() => {
    fetchNewDog();
  }, []);

  const fetchNewDog = async () => {
    try {
      const response = await fetch('/dogs');
      if (response.ok) {
        const newDogData = await response.json();
        setNewDog(newDogData);
      } else {
        const errorData = await response.json();
        setNewDogError(errorData);
      }
    } catch (err) {
      setNewDogError({ message: 'An error occurred while trying to add a new dog' });
    }
  };

  const formSchema = yup.object().shape({
    name: yup.string().required('Must enter a name'),
    breed: yup.string().required('Must enter dog breed').max(15),
    age: yup.number().positive().integer().required('Must enter dog age').typeError('Please enter a number').max(125),
    gender: yup.string().required('Must ender dog gender').max(15),
    description: yup.string().required('Must enter dog description'),
    image_url: yup.string().url('Invalid image').required('Must enter a URL'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      breed: '',
      age: '',
      gender: '',
      description: '',
      image_url: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          setNewDog(newDog);
        }
      });
    },
  });

  return (
    <div className='container mt-4'>
      <h1>New Dog</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            id='name'
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <div className='invalid-feedback'>{formik.errors.name}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='breed'>Breed</label>
          <input
            type='text'
            className={`form-control ${formik.touched.breed && formik.errors.breed ? 'is-invalid' : ''}`}
            id='breed'
            name='breed'
            onChange={formik.handleChange}
            value={formik.values.breed}
          />
          {formik.touched.breed && formik.errors.breed && <div className='invalid-feedback'>{formik.errors.breed}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
            id='age'
            name='age'
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age && <div className='invalid-feedback'>{formik.errors.age}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='gender'>Gender</label>
          <input
            type='text'
            className={`form-control ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}`}
            id='gender'
            name='gender'
            onChange={formik.handleChange}
            value={formik.values.gender}
          />
          {formik.touched.gender && formik.errors.gender && (
            <div className='invalid-feedback'>{formik.errors.gender}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
            id='description'
            name='description'
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className='invalid-feedback'>{formik.errors.description}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='image_url'>Image URL</label>
          <input
            type='text'
            className={`form-control ${formik.touched.image_url && formik.errors.image_url ? 'is-invalid' : ''}`}
            id='image_url'
            name='image_url'
            onChange={formik.handleChange}
            value={formik.values.image_url}
          />
          {formik.touched.image_url && formik.errors.image_url && (
            <div className='invalid-feedback'>{formik.errors.image_url}</div>
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
export default NewDogForm;
