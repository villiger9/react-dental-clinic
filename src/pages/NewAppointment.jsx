import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container-lg bg-secondary">
      <div className="text-center mt-5">
        <h2>استمارة موعد جديد</h2>
        <p className="lead">يرجى اضافة المعلومات التالية</p>
      </div>
      <div className="row justify-content-center my-5">
        <div className="col-md-5 text-center ">
          <Form method="post" action="/newAppointment">
            <div className="mb-4 text-end">
              {/* use textend for arabic right alignment */}
              <label htmlFor="name" className="form-label">
                :الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control text-end"
                required
              />
            </div>

            <div className="mb-4 text-end">
              <label htmlFor="phoneNumber" className="form-label">
                :رقم الهاتف
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control text-end"
                required
              />
            </div>

            <div className=" mb-3 text-end">
              <div>
                <label htmlFor="bloodType" className="form-label">
                  :زمرة الدم
                </label>
              </div>
              <select className="form-select" id="bloodType" name="bloodType">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <div className="mb-3 text-end">
                <div>
                  <label htmlFor="bloodType" className="form-label">
                    :نوع الحجز
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="appointmentType"
                    id="radio1"
                    value="مسبق"
                  />
                  <label className="form-check-label" htmlFor="radio1">
                    مسبق
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="appointmentType"
                    id="radio2"
                    value="مباشر"
                  />
                  <label className="form-check-label" htmlFor="radio2">
                    مباشر
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="appointmentType"
                    id="radio3"
                    value="حالة إسعافية"
                  />
                  <label className="form-check-label" htmlFor="radio3">
                    حالة إسعافية
                  </label>
                </div>
              </div>

              <div className="mb-3 text-end">
                <label htmlFor="appointmentDate" className="form-label">
                  :تاريخ الحجز
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  className="form-control"
                  min={today} // Prevents selecting past dates
                  required
                />
              </div>

              <div className="mt-4 text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'يتم التحقق...' : 'اضافة الموعد'}
                </Button>
              </div>
              {data?.error && (
                <div
                  className="alert alert-danger mt-3 text-center"
                  role="alert"
                >
                  {data.error}
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const appointmentAction = async ({ request }) => {
  console.log(request);

  const data = await request.formData();

  // package the form data into an object
  const submission = {
    name: data.get('name'),
    phoneNumber: data.get('phoneNumber'),
    bloodType: data.get('bloodType'),
    appointmentType: data.get('appointmentType'),
    appointmentDate: data.get('appointmentDate'),
  };

  console.log(submission);

  // send post request

  try {
    const res = await fetch('http://localhost:8000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });

    if (!res.ok) {
      // catch the error status
      const errorData = await res.json().catch(() => ({}));
      console.error('Server Refusal:', res.status, errorData);
      return {
        error: `Server returned ${res.status}: ${errorData.message || 'Validation failed'}`,
      };
    }

    return redirect('/');
  } catch (error) {
    //  catches network/connection errors
    return { error: 'Cannot connect to the server.' };
  }
};
