import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container py-5" dir="rtl">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">استمارة موعد جديد</h2>
        <p className="text-muted">أدخل بيانات المريض </p>
      </div>

      {/* Form Card */}
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <div className="card-body p-4 p-md-5">
          <Form method="post">
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-semibold">
                اسم المريض
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-control-lg text-end"
                placeholder="الاسم والكنية"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="phoneNumber" className="form-label fw-semibold">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="09xxxxxxxx"
                  required
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="bloodType" className="form-label fw-semibold">
                  زمرة الدم
                </label>
                <select className="form-select" id="bloodType" name="bloodType">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <hr className="my-4 opacity-25" />

            <div className="mb-4">
              <label className="form-label d-block fw-semibold mb-3">
                نوع الحجز
              </label>
              <div className="d-flex gap-3 justify-content-start">
                {['مسبق', 'مباشر', 'حالة إسعافية'].map((type, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appointmentType"
                      id={`radio${idx}`}
                      value={type}
                      defaultChecked={idx === 0}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`radio${idx}`}
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label
                  htmlFor="appointmentDate"
                  className="form-label fw-semibold"
                >
                  التاريخ
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  className="form-control"
                  min={today}
                  required
                />
              </div>
              <div className="col-md-6 mb-4">
                <label
                  htmlFor="appointmentTime"
                  className="form-label fw-semibold"
                >
                  الوقت
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="appointmentStatus"
                className="form-label fw-semibold"
              >
                الحالة الابتدائية
              </label>
              <select
                className="form-select bg-light"
                id="appointmentStatus"
                name="appointmentStatus"
              >
                <option value="upcoming">قادم</option>
                <option value="waiting">في الانتظار</option>
                <option value="inTreatment">مريض حالي</option>
              </select>
            </div>

            <div className="d-grid mt-5">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="py-2 shadow-sm"
              >
                {isSubmitting ? 'جاري الحفظ...' : 'تأكيد إضافة الموعد'}
              </Button>
            </div>

            {data?.error && (
              <div
                className="alert alert-danger mt-4 border-0 text-center small"
                role="alert"
              >
                {data.error}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

// Keep your appointmentAction logic the same

export const appointmentAction = async ({ request }) => {
  console.log(request);

  const data = await request.formData();

  // package the form data into an object
  const submission = Object.fromEntries(data);

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
