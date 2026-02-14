import Button from 'react-bootstrap/Button';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import NewAppointment, { appointmentAction } from './pages/NewAppointment';
import AppointmentDetails from './pages/AppointmentDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="newappointment"
        element={<NewAppointment />}
        action={appointmentAction}
      />
      <Route path="appointments/:id" element={<AppointmentDetails />}></Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
