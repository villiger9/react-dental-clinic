import { useLoaderData, Form, redirect, Link } from 'react-router-dom';
import { deleteAppointment } from '../helpers';

export default function AppointmentDetails() {
  const appointment = useLoaderData();

  return (
    <div className="container mt-5 text-end" dir="rtl">
      <div className="mb-3">
        <Link
          to="/"
          className="btn btn-link p-0 text-decoration-none text-primary"
        >
          <i className="bi bi-arrow-right"></i> العودة
        </Link>
      </div>

      <article
        className={`card shadow-sm p-4 ${appointment.appointmentType === 'حالة إسعافية' ? 'border-danger border-2' : ''}`}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h2 className="text-primary mb-0 fw-bold">{appointment.name}</h2>

          {appointment.appointmentType === 'حالة إسعافية' && (
            <span className="badge bg-danger d-flex align-items-center gap-2 py-2 px-3">
              <div
                className="spinner-grow spinner-grow-sm text-white"
                role="status"
              ></div>
              <span className="fs-6">حالة إسعافية </span>
            </span>
          )}
        </div>

        <div className="row g-3">
          <div className="col-md-6 mb-3">
            <i className="bi bi-telephone text-muted ms-2"></i>
            رقم الهاتف: {appointment.phoneNumber}
          </div>
          <div className="col-md-6 mb-3">
            <i className="bi bi-droplet text-muted ms-2"></i>
            زمرة الدم:{' '}
            <span className="badge bg-info">{appointment.bloodType}</span>
          </div>
          <div className="col-md-6 mb-3">
            <i className="bi bi-calendar-event text-muted ms-2"></i>
            التوقيت: {appointment.appointmentDate} |{' '}
            {appointment.appointmentTime}
          </div>
          <div className="col-md-6 mb-3">
            <i className="bi bi-info-circle text-muted ms-2"></i>
            نوع الحجز: {appointment.appointmentType}
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <Form
          method="post"
          onSubmit={(e) => {
            if (!window.confirm('هل أنت متأكد؟')) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="intent" value="delete" />

          <button
            type="submit"
            className={`btn btn-lg ${appointment.appointmentStatus === 'inTreatment' ? 'btn-success' : 'btn-danger'} d-inline-flex align-items-center gap-2`}
          >
            <i
              className={`bi ${appointment.appointmentStatus === 'inTreatment' ? 'bi-check2-circle' : 'bi-x-circle'}`}
            ></i>
            <span>
              {appointment.appointmentStatus === 'inTreatment'
                ? 'إنهاء الجلسة '
                : 'إلغاء الموعد نهائياً'}
            </span>
          </button>
        </Form>
      </article>
    </div>
  );
}

export const appointmentDetailsLoader = async ({ params }) => {
  const res = await fetch('http://localhost:8000/appointments/' + params.id);
  if (!res.ok) throw Error('تعذر العثور على هذا الموعد');
  return res.json();
};

export const deleteAppointmentAction = async ({ params }) => {
  await deleteAppointment(params.id);
  return redirect('/');
};
