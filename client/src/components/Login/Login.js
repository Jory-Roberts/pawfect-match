import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = ({ onLogIn }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const userData = await response.json();
          onLogIn(userData);
        } else {
          const errorData = await response.json();
          alert(errorData.error);
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    },
  });

  return (
    <div className='container mt-5'>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            name='username'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='invalid-feedback'>{formik.errors.username}</div>
          ) : null}
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='invalid-feedback'>{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type='submit'
          className='btn btn-primary'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
