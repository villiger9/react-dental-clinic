import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-bold fs-3">Dental Clinic</span>

          <div className="navbar-nav">
            <NavLink to="/" className="nav-link px-3">
              Home
            </NavLink>
            <NavLink to="#" className="nav-link px-3">
              Create Appointment
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container mt-4 flex-grow-1">
        <div className="card shadow-sm p-4 bg-white">
          <Outlet />
        </div>
      </main>

      <footer className="text-center py-3 text-muted mt-auto border-top">
        <small>&copy; 2026 ELKOOD TECH.</small>
      </footer>
    </div>
  );
}
