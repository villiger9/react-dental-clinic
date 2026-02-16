export default function EmergencyBadge() {
  return (
    <span className="badge bg-danger d-flex align-items-center gap-1 py-1 px-2">
      <div className="spinner-grow spinner-grow-sm text-white" role="status">
        <span className="visually-hidden">اسعاف</span>
      </div>
      <span>إسعاف</span>
    </span>
  );
}
