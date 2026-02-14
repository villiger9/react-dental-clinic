import { useLoaderData } from 'react-router-dom';
import AppointmentList from './AppointmentList';

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
