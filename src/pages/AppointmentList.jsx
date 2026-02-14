import { Link } from 'react-router-dom';

export default function AppointmentList({ appointments }) {
  return (
    <div className="">
      {appointments.map((appointment) => (
        <div className="" key={appointment.id}>
          <Link to={`/appointments/${appointment.id}`}>
            <h3>{appointment.name}</h3>
            <p>{appointment.appointmentType}</p>
            <p>{appointment.appointmentDate}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
