import { NavLink } from 'react-router-dom';
import logo from '../assets/coffee.png';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#be9b7b' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ color: '#4b3832' }}>
          <img src={logo} alt="Analytics Dashboard Logo" height="30" className="d-inline-block align-top" />
          {' '}Analytics Dashboard
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" style={{ color: '#4b3832' }}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tables" style={{ color: '#4b3832' }}>
                Tables
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{ cursor: 'pointer', color: '#4b3832' }} onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '🔆'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
