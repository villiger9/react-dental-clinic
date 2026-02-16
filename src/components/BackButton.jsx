import { Link } from 'react-router-dom';

export default function BackButton({ to = '/', text = 'العودة' }) {
  return (
    <div className="mb-3">
      <Link
        to={to}
        className="btn btn-link p-0 text-decoration-none text-primary"
      >
        <i className="bi bi-arrow-right"></i>
        <span>{text}</span>
      </Link>
    </div>
  );
}
