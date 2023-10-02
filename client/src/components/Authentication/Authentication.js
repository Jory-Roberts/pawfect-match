import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

const Authentication = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();

  const signUpSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  });

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: isSignUp ? signUpSchema : loginSchema,
    onSubmit: async (values) => {
      const endpoint = isSignUp ? '/users' : '/login';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const userData = await response.json();

        if (response.ok) {
          login(userData);
          if (isSignUp) {
            alert('Account created!');
          } else {
            alert('Logged in successfully!');
          }
          navigate('/');
        } else {
          const errorMessage = userData.message || 'Unable to authenticate';
          alert(errorMessage);
        }
      } catch (err) {
        console.error('An error occurred during authentication', err);
        alert('An unexpected error occurred. Please try again.');
      }
    },
  });

  return (
    <div className='container'>
      <h1>{isSignUp ? 'Signup' : 'Login'}</h1>
      <form onSubmit={formik.handleSubmit}>
        {(!isSignUp || isSignUp) && ( // Display "Username" field in both modes
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && <div className='error'>{formik.errors.username}</div>}
          </div>
        )}

        {isSignUp && (
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
          </div>
        )}

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}
        </div>

        <button
          type='submit'
          className='btn btn-primary'
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <button
        className='btn btn-secondary mt-2'
        onClick={() => setIsSignUp(!isSignUp)}
      >
        Switch to {isSignUp ? 'Log In' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Authentication;
