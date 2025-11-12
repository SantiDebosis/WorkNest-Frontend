import { Link } from 'wouter';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-9xl font-extrabold text-[#ffb703]">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-[#023047]">
        Página No Encontrada
      </h2>
      <p className="mt-2 text-lg text-[#219ebc]">
        Lo sentimos, la página que buscas no existe.
      </p>
      
      <div className="mt-8">
        <Link href="/">
          <Button 
            variant="primary" 
            className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
          >
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}