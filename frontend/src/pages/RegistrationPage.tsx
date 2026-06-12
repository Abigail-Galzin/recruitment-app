import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  const handleRegistrationSuccess = () => {
    console.log('Registration successful');
  };

  return (
    <div>
      <RegistrationForm onSuccess={handleRegistrationSuccess} />
    </div>
  );
}
