import { Form, redirect, useActionData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NewAppointment() {
  const data = useActionData();

  return (
    <div>
      <Form method="post" action="/newAppointment">
        <label>
          <span>first name: </span>
          <input type="text" name="firstName" required />
        </label>
        <label>
          <span>last name: </span>
          <input type="text" name="lastName" required />
        </label>
        <label>
          <span>age: </span>
          <input type="number" name="age" required />
        </label>
        <label>
          <span>phone number: </span>
          <input type="tel" name="phoneNumber" required />
        </label>
        <Button>Submit</Button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}

export const appointmentAction = async ({ request }) => {
  console.log(request);

  const data = await request.formData();

  const submission = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    age: data.get('age'),
    phoneNumber: data.get('phoneNumber'),
  };

  console.log(submission);

  //   send post request

  //   redirect the user
  return redirect('/');
};
