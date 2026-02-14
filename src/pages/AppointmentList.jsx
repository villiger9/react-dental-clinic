// AppointmentList.jsx
import { Link } from 'react-router-dom';

export default function AppointmentList({ appointments, statusType }) {
  return (
    <div className="d-flex flex-column gap-3">
      {appointments.length === 0 && (
        <p className="text-muted text-center small">
          لا يوجد مرضى في هذه القائمة
        </p>
      )}

      {appointments.map((appointment) => (
        <div
          className={`card shadow-sm text-end ${appointment.appointmentType === 'حالة إسعافية' ? 'border-danger' : ''}`}
          key={appointment.id}
        >
          <div className="card-body">
            {appointment.appointmentType === 'حالة إسعافية' && (
              <span className="badge bg-danger mb-2">حالة إسعافية</span>
            )}
            <h5 className="card-title">{appointment.name}</h5>
            <p className="card-text mb-1 small text-muted">
              {appointment.appointmentDate} | {appointment.appointmentTime}
            </p>

            <div className="d-flex gap-2 mt-3 justify-content-start">
              <Link
                to={`/appointments/${appointment.id}`}
                className="btn btn-sm btn-outline-secondary"
              >
                التفاصيل
              </Link>

              {/* زر النقل من الانتظار إلى المعالجة */}
              {statusType === 'waiting' && (
                <button className="btn btn-sm btn-success">بدء المعالجة</button>
              )}

              {/* زر الإلغاء للمواعيد المسبقة التي لم تحضر بعد */}
              {statusType === 'upcoming' && (
                <button className="btn btn-sm btn-outline-danger">إلغاء</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
