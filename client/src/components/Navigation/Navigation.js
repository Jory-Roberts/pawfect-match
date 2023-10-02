import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';

const Navigation = () => {
  const { user, logout } = useAuth();
  console.log('User in navigation', user);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          Welcome!
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarTogglerDemo02'
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                to='/'
              >
                Home
              </Link>
            </li>
            {user ? (
              <li className='nav-item'>
                <button
                  className='nav-link btn btn-link'
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to='/authentication'
                >
                  Login/Signup
                </Link>
              </li>
            )}
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/dogs'
              >
                Dogs
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/dogs/new'
              >
                Add Dog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
