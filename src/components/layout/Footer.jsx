export default function Footer() {
  const currentYear = 2025;

  return (
    <footer className="w-full bg-white shadow-inner mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-[#219ebc]">
          &copy; {currentYear} WorkNest. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}