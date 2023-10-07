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
      <div className='row'>
        <div className='col-12 col-md-4 mx-auto'>
          <h2 className='text-center mb-4'>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <label
                htmlFor='username'
                className='form-label'
              >
                Username:
              </label>
              <input
                id='username'
                name='username'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'
                }
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='invalid-feedback'>{formik.errors.username}</div>
              ) : null}
            </div>

            <div className='mb-3'>
              <label
                htmlFor='password'
                className='form-label'
              >
                Password:
              </label>
              <input
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='invalid-feedback'>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-primary'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
