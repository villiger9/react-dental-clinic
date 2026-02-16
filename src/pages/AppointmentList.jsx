import { Link, useFetcher } from 'react-router-dom'; // 1. استخدم useFetcher

export default function AppointmentList({ appointments, statusType }) {
  const fetcher = useFetcher(); // 2. عرف الـ fetcher

  return (
    <div className="d-flex flex-column gap-3">
      {appointments.length === 0 && (
        <p className="text-muted text-center small">لا يوجد مرضى</p>
      )}

      {appointments.map((appointment) => (
        <div
          className={`card shadow-sm text-end ${appointment.appointmentType === 'اسعاف' ? 'border-danger' : ''}`}
          key={appointment.id}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">{appointment.name}</h5>

              {appointment.appointmentType === 'اسعاف' && (
                <span className="badge bg-danger d-flex align-items-center gap-1">
                  <div
                    className="spinner-grow spinner-grow-sm text-white"
                    role="status"
                  >
                    <span className="visually-hidden">اسعاف</span>
                  </div>
                  <span>اسعاف</span>
                </span>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3 justify-content-start align-items-center">
              <Link
                to={`/appointments/${appointment.id}`}
                className="btn btn-sm btn-outline-secondary"
              >
                <i className="bi bi-info-circle"></i>
                {' التفاصيل'}
              </Link>

              <fetcher.Form
                method="post"
                className="m-0"
                onSubmit={(e) => {
                  if (!window.confirm('هل أنت متأكد؟')) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={appointment.id} />
                <input type="hidden" name="intent" value="cancel-appointment" />
                <button
                  type="submit"
                  className={`btn btn-sm ${appointment.appointmentStatus === 'inTreatment' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                >
                  <i
                    className={`bi ${appointment.appointmentStatus === 'inTreatment' ? 'bi-check2-circle' : 'bi-x-circle'}`}
                  ></i>
                  {appointment.appointmentStatus === 'inTreatment'
                    ? ' انهاء الجلسة'
                    : ' الغاء الموعد'}
                </button>
              </fetcher.Form>

              {appointment.appointmentStatus === 'waiting' && (
                <fetcher.Form method="post" className="m-0">
                  <input type="hidden" name="id" value={appointment.id} />
                  <input
                    type="hidden"
                    name="intent"
                    value="move-to-treatment"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-warning text-secondary"
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                    {' بدء الجلسة'}
                  </button>
                </fetcher.Form>
              )}

              {appointment.appointmentStatus === 'upcoming' && (
                <fetcher.Form method="post" className="m-0">
                  <input type="hidden" name="id" value={appointment.id} />
                  <input type="hidden" name="intent" value="move-to-waiting" />
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                    {' نقل الى الانتظار'}
                  </button>
                </fetcher.Form>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
