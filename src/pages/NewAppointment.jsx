import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container-lg">
      <div className="text-center">
        <h2>استمارة موعد جديد</h2>
        <p className="lead">يرجى اضافة المعلومات التالية</p>
      </div>
      <div className="row justify-content-center my-5">
        <div className="col-lg-6">
          <Form method="post" action="/newAppointment">
            {/* First Name */}
            <div className="mb-3 text-end">
              {/* use textend for arabic right alignment */}
              <label htmlFor="name" className="form-label">
                :الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 text-end">
              <label htmlFor="phoneNumber" className="form-label">
                :رقم الهاتف
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 text-end">
              <div>
                <label htmlFor="bloodType" className="form-label">
                  :زمرة الدم
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio1"
                  value="A+"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  A+
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio2"
                  value="A-"
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  A-
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio3"
                  value="B+"
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  B+
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio4"
                  value="B-"
                />
                <label className="form-check-label" htmlFor="inlineRadio4">
                  B-
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio5"
                  value="O+"
                />
                <label className="form-check-label" htmlFor="inlineRadio5">
                  O+
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio6"
                  value="O-"
                />
                <label className="form-check-label" htmlFor="inlineRadio6">
                  O-
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio7"
                  value="AB+"
                />
                <label className="form-check-label" htmlFor="inlineRadio7">
                  AB+
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bloodType"
                  id="inlineRadio8"
                  value="AB-"
                />
                <label className="form-check-label" htmlFor="inlineRadio8">
                  AB-
                </label>
              </div>
            </div>

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
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {data.error}
              </div>
            )}
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
