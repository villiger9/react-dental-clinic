import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
              <label htmlFor="firstName" className="form-label">
                :الاسم
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 text-end">
              <label htmlFor="lastName" className="form-label">
                :الكنية
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 text-end">
              <label htmlFor="age" className="form-label">
                :العمر
              </label>
              <input
                type="number"
                id="age"
                name="age"
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
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    age: Number(data.get('age')),
    phoneNumber: data.get('phoneNumber'),
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
