import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../useFetch';

export default function AppointmentDetails() {
  const navigate = useNavigate(); // Initialize the hook

  const { id } = useParams();
  const {
    data: appointment,
    error,
    isLoading,
  } = useFetch('http://localhost:8000/appointments/' + id);

  const handleClick = () => {
    fetch('http://localhost:8000/appointments/' + appointment.id, {
      method: 'DELETE',
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="">
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {appointment && (
        <article>
          <h2>{appointment.name}</h2>
          <p>{appointment.phoneNumber}</p>
          <p>{appointment.bloodType}</p>
          <div>{appointment.appointmentType}</div>
          <div>{appointment.appointmentTime}</div>
          <div>{appointment.appointmentDate}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
