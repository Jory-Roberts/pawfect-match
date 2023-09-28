import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav class='navbar navbar-dark bg-dark'>
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
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/dogs'
              >
                Dogs
              </Link>
            </li>
            <li className='nav-item'>
              <span
                className='nav-link disabled'
                tabIndex='-1'
                aria-disabled='true'
              >
                Disabled
              </span>
            </li>
          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button
              className='btn btn-outline-success'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
