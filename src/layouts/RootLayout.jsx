import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    // "d-flex flex-column min-vh-100" keeps the footer at the bottom
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-md navbar-light pt-5 pb-4">
        <div className="container-xxl">
          <NavLink className="navbar-brand" to="/">
            <span className="text-secondary fw-bold">العيادة السنية</span>
          </NavLink>

          {/* The Hamburger Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* The Links Structure */}
          <div
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav nav-pills">
              <li className="nav-item">
                <NavLink className="nav-link" to="newappointment">
                  اضافة موعد
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  الرئيسية
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-5 flex-grow-1">
        <div className="card border-0 shadow-sm p-4">
          <Outlet />
        </div>
      </main>

      <footer className="text-center py-4 text-muted bg-white border-top mt-5">
        <small>&copy; 2026 ELKOOD TECH.</small>
      </footer>
    </div>
  );
}
