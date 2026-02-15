import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light" dir="rtl">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-center" to="/">
            <span className="fs-4 fw-bold text-primary">العيادة السنية</span>
          </NavLink>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="main-nav"
          >
            <ul className="navbar-nav gap-2 mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link px-4 rounded-pill fw-semibold ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary'}`
                  }
                  to="/"
                >
                  الرئيسية
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link px-4 rounded-pill fw-semibold ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary'}`
                  }
                  to="newappointment"
                >
                  إضافة موعد
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* main content area */}
      <main className="container my-5 flex-grow-1">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-muted bg-white border-top shadow-sm">
        <div className="container">
          <p className="mb-0 small fw-bold">© 2026 ELKOOD TECH</p>
          <span className="text-secondary" style={{ fontSize: '0.7rem' }}>
            نظام إدارة العيادة
          </span>
        </div>
      </footer>
    </div>
  );
}
