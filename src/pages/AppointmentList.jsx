import { Link } from 'react-router-dom';

export default function AppointmentList({ appointments }) {
  return (
    <div className="container-lg bg-secondary color">
      {appointments.map((appointment) => (
        <div className="text-center mt-5" key={appointment.id}>
          <Link
            className="text-dark text-decoration-none"
            to={`/appointments/${appointment.id}`}
          >
            <h3>{appointment.name}</h3>
            <p>{appointment.appointmentType}</p>
            <p>{appointment.appointmentDate}</p>
            <p>{appointment.appointmentTime}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
