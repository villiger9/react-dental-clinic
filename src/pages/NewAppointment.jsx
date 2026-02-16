import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const today = new Date().toISOString().split('T')[0];
  const generateTimeSlots = () => {
    const slots = [];
    let start = 9;
    let end = 17;

    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  };

  return (
    <div className="container py-5" dir="rtl">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-ui-checks"></i> استمارة موعد جديد
        </h2>
        <p className="text-muted">أدخل بيانات المريض </p>
      </div>

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
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person-plus text-primary"></i>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="الاسم والكنية"
                  minLength="3"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="phoneNumber" className="form-label fw-semibold">
                  رقم الهاتف
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-telephone-plus text-primary"></i>
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="09xxxxxxxx"
                    maxLength="10"
                    pattern="09[0-9]{8}"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="bloodType" className="form-label fw-semibold">
                  زمرة الدم
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-droplet text-primary"></i>
                  </span>
                  <select
                    className="form-select"
                    id="bloodType"
                    name="bloodType"
                    dir="ltr"
                  >
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
            </div>

            <hr className="my-4 opacity-25" />

            <div className="mb-4">
              <label className="form-label d-block fw-semibold mb-3">
                نوع الحجز
              </label>
              <div className="d-flex gap-3 justify-content-start">
                {['مسبق', 'مباشر', 'اسعاف'].map((type, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      className="form-check-input bg-secondary"
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
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-clock text-primary"></i>
                  </span>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    className="form-select"
                    required
                  >
                    <option value="">اختر الوقت...</option>
                    {generateTimeSlots().map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
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

export const appointmentAction = async ({ request }) => {
  const data = await request.formData();
  const submission = Object.fromEntries(data);

  const resCheck = await fetch('http://localhost:8000/appointments');
  const existingAppointments = await resCheck.json();

  const isConflicting = existingAppointments.some(
    (app) =>
      app.appointmentDate === submission.appointmentDate &&
      app.appointmentTime === submission.appointmentTime,
  );

  if (isConflicting) {
    return { error: 'هذا الموعد محجوز، يرجى اختيار وقت أو تاريخ آخر' };
  }

  if (submission.name.trim().length < 3) return { error: 'الاسم المدخل قصير' };

  try {
    const res = await fetch('http://localhost:8000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });

    if (!res.ok) throw Error();
    return redirect('/?msg=added');
  } catch (error) {
    return { error: 'حدث خطأ أثناء الاتصال' };
  }
};
