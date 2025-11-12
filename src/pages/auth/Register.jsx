import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../lib/schemas';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLocation, Link } from 'wouter';
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterPage() {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register: registerAction } = useAuth();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(false);
    const result = await registerAction(data);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => setLocation('/login'), 3000); // Redirigir a login
    } else {
      setApiError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8ecae6]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-[#023047]">
          Crear Cuenta
        </h2>

        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            {apiError}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-md">
            ¡Registro exitoso! Serás redirigido a la página de inicio de sesión...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="userName"
            label="Nombre de Usuario"
            type="text"
            placeholder="ej: usuario123"
            error={errors.userName}
            {...register('userName')}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="ej: usuario@gmail.com"
            error={errors.email}
            {...register('email')}
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="ej: usuario@123"
            error={errors.password}
            {...register('password')}
          />
          <Input
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="ej: usuario@123"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
            isLoading={isSubmitting}
          >
            Registrarse
          </Button>
        </form>

        <p className="text-sm text-center text-[#023047]/70">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/login"
            className="font-medium text-[#219ebc] hover:text-[#023047]"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
