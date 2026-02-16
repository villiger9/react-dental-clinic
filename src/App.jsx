import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home, { appointmentsLoader, homeAction } from './pages/Home';
import NewAppointment, { appointmentAction } from './pages/NewAppointment';
import AppointmentDetails, {
  appointmentDetailsLoader,
  deleteAppointmentAction,
} from './pages/AppointmentDetails';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route
        index
        element={<Home />}
        loader={appointmentsLoader}
        action={homeAction}
      />
      <Route
        path="newappointment"
        element={<NewAppointment />}
        action={appointmentAction}
      />
      <Route
        path="appointments/:id"
        element={<AppointmentDetails />}
        loader={appointmentDetailsLoader}
        action={deleteAppointmentAction}
        errorElement={<NotFound />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
