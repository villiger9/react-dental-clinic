import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function NotFound() {
  return (
    <div>
      <BackButton to="/" text="رجوع " />
      <h2>لم نتمكن من الوصول الى الصفحة المطلوبة</h2>
      <p>الرابط خاطئ او غير متوفر حالياً</p>
      <p>
        الذهاب الى <Link to="/">الصفحة الرئيسية</Link>.
      </p>
    </div>
  );
}
