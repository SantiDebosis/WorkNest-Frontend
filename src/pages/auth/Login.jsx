import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/schemas';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLocation, Link } from 'wouter';
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const [apiError, setApiError] = useState(null);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    const result = await login(data);

    if (result.success) {
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect') || '/dashboard';
      setLocation(redirectUrl);
    } else {
      setApiError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8ecae6]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-[#023047]">
          Iniciar Sesión
        </h2>

        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="emailOrUsername"
            label="Email o Usuario"
            type="text"
            placeholder="ej: usuario123 / usuario@gmail.com"
            error={errors.emailOrUsername}
            {...register('emailOrUsername')}
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="ej: usuario@123"
            error={errors.password}
            {...register('password')}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </form>

        <p className="text-sm text-center text-[#023047]/70">
          ¿No tienes cuenta?{' '}
          <Link
            href="/register"
            className="font-medium text-[#219ebc] hover:text-[#023047]"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
