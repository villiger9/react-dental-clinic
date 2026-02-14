import AppointmentList from './AppointmentList';
import useFetch from '../../useFetch';

export default function Home() {
  const {
    data: appointments,
    isLoading,
    error,
  } = useFetch('http://localhost:8000/appointments');
  return (
    <div className="">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading</div>}
      {appointments && <AppointmentList appointments={appointments} />}
    </div>
  );
}
