import { Link } from 'wouter';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button';

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-extrabold text-[#023047]">
        Bienvenido a <span className="text-[#ffb703]">WorkNest</span>
      </h1>
      <p className="mt-4 text-xl text-[#023047] max-w-2xl">
        Organiza tus tareas, colabora con tu equipo y lleva tu productividad al siguiente nivel.
      </p>
      <div className="mt-8">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <Button variant="primary" className="text-lg px-8 py-3 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300">
              Ir a mis Tableros
            </Button>
          </Link>
        ) : (
          <Link href="/register">
            <Button variant="primary" className="text-lg px-8 py-3 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300">
              Comienza Gratis
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}