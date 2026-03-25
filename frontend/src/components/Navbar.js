import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand" role="banner">
          <div className="brand-logo" aria-hidden="true">
            <img src="/mn-logo.png" alt="MealNest logo" />
          </div>
          <span>MealNest</span>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/planner" className="nav-link">
            Meal Planner
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar