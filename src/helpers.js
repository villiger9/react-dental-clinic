export const deleteAppointment = async (id) => {
  const res = await fetch(`http://localhost:8000/appointments/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw Error('فشل حذف الموعد');
  return res;
};
