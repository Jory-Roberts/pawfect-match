import { Link } from 'react-router-dom';

const Navigation = () => {
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
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='void'
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
