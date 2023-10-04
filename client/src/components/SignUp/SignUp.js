import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const SignUp = ({ onSignUp }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const userData = await response.json();
          onSignUp(userData);
        } else {
          const errorData = await response.json();
          alert(errorData.error);
        }
      } catch (error) {
        console.error('Error during signup', error);
      }
    },
  });
  return (
    <div className='container mt-5'>
      <h2>SignUp</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label
            htmlFor='username'
            className='form-label'
          >
            Username
          </label>
          <input
            id='username'
            name='username'
            type='text'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='text-danger'>{formik.errors.username}</div>
          ) : null}
        </div>

        <div className='mb-3'>
          <label
            htmlFor='email'
            className='form-label'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='text-danger'>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className='mb-3'>
          <label
            htmlFor='password'
            className='form-label'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-danger'>{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type='submit'
          className='btn btn-primary'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
