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
          className={`card shadow-sm text-end ${appointment.appointmentType === 'حالة إسعافية' ? 'border-danger' : ''}`}
          key={appointment.id}
        >
          <div className="card-body">
            <h5 className="card-title">{appointment.name}</h5>

            <div className="d-flex gap-2 mt-3 justify-content-start align-items-center">
              <Link
                to={`/appointments/${appointment.id}`}
                className="btn btn-sm btn-outline-secondary"
              >
                التفاصيل
              </Link>

              <fetcher.Form method="post" className="m-0">
                <input type="hidden" name="id" value={appointment.id} />
                <input type="hidden" name="intent" value="cancel-appointment" />
                <button
                  type="submit"
                  className={`btn btn-sm ${appointment.appointmentStatus === 'inTreatment' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                >
                  {appointment.appointmentStatus === 'inTreatment'
                    ? 'انهاء الجلسة'
                    : 'الغاء الموعد'}
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
                    بدء المعالجة
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
                    نقل الى الانتظار
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
