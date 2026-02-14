import { useLoaderData, Form, redirect } from 'react-router-dom';

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

        {/* استخدام Form التابع لـ React Router لإرسال طلب الحذف */}
        <Form method="post">
          <button type="submit" className="btn btn-danger px-4">
            حذف الموعد
          </button>
        </Form>
      </article>
    </div>
  );
}

// 1. الـ Loader لجلب البيانات قبل عرض الصفحة
export const appointmentDetailsLoader = async ({ params }) => {
  const res = await fetch('http://localhost:8000/appointments/' + params.id);
  if (!res.ok) throw Error('تعذر العثور على هذا الموعد');
  return res.json();
};

// 2. الـ Action لمعالجة عملية الحذف
export const deleteAppointmentAction = async ({ params }) => {
  const res = await fetch('http://localhost:8000/appointments/' + params.id, {
    method: 'DELETE',
  });

  if (!res.ok) throw Error('فشل حذف الموعد');

  return redirect('/');
};
