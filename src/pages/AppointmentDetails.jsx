import { useLoaderData, Form, redirect } from 'react-router-dom';
import { deleteAppointment } from '../helpers';

export default function AppointmentDetails() {
  const appointment = useLoaderData();

  return (
    <div className="container mt-5 text-end" dir="rtl">
      <article className="card shadow-sm p-4">
        <h2 className="text-primary mb-4">{appointment.name}</h2>
        <div className="mb-3">
          <strong>رقم الهاتف:</strong> {appointment.phoneNumber}
        </div>
        <div className="mb-3">
          <strong>زمرة الدم:</strong>{' '}
          <span className="badge bg-info">{appointment.bloodType}</span>
        </div>
        <div className="mb-3">
          <strong>نوع الحجز:</strong> {appointment.appointmentType}
        </div>
        <div className="mb-3">
          <strong>التوقيت:</strong> {appointment.appointmentDate} |{' '}
          {appointment.appointmentTime}
        </div>

        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <button type="submit" className="btn btn-danger px-4">
            حذف الموعد
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
