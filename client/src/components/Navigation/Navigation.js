import { Link, useNavigate } from 'react-router-dom';

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate('/');
      }
    });
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          Welcome {user ? `, ${user.username}` : ''}!
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
              <>
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
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='#'
                    onClick={handleLogOut}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  id='userDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  User
                </a>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='userDropdown'
                >
                  <li>
                    <Link
                      className='dropdown-item'
                      to='/signup'
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to='/login'
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
