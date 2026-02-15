import { useLoaderData } from 'react-router-dom';
import AppointmentList from './AppointmentList';
import { deleteAppointment } from '../helpers';

export default function Home() {
  const allAppointments = useLoaderData();

  return (
    <div className="container-fluid py-4 text-end" dir="rtl">
      <div className="row g-4">
        {/* first column */}
        <div className="col-md-4">
          <h4 className="text-primary border-bottom pb-2">المرضى القادمون</h4>
          <AppointmentList
            appointments={allAppointments.filter(
              (a) => a.appointmentStatus === 'upcoming',
            )}
          />
        </div>

        {/* second column */}
        <div className="col-md-4 border-start border-end">
          <h4 className="text-warning border-bottom pb-2">في الانتظار</h4>
          <AppointmentList
            appointments={allAppointments.filter(
              (a) => a.appointmentStatus === 'waiting',
            )}
          />
        </div>

        {/* third column */}
        <div className="col-md-4">
          <h4 className="text-success border-bottom pb-2">المريض الحالي</h4>
          <AppointmentList
            appointments={allAppointments.filter(
              (a) => a.appointmentStatus === 'inTreatment',
            )}
          />
        </div>
      </div>
    </div>
  );
}

//loader function

export const appointmentsLoader = async () => {
  const res = await fetch('http://localhost:8000/appointments');

  if (!res.ok) {
    throw Error('Could not fetch the appointments');
  }

  return res.json();
};

// Home.jsx

export const homeAction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const intent = formData.get('intent');

  let newStatus = '';
  if (intent === 'move-to-waiting') newStatus = 'waiting';
  if (intent === 'move-to-treatment') newStatus = 'inTreatment';

  if (newStatus) {
    const res = await fetch(`http://localhost:8000/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentStatus: newStatus }),
    });

    if (!res.ok) throw Error('تعذر تحديث حالة المريض');
  }

  if (intent === 'cancel-appointment') {
    await deleteAppointment(id);
    return { success: true };
  }

  return { success: true };
};
