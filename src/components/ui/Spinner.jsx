export default function Spinner({ fullPage = false }) {
  const spinner = (
    <div className="flex justify-center items-center" aria-label="Cargando...">
      <svg 
        className="animate-spin h-10 w-10 text-[#219ebc]" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"></path>
      </svg>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#8ecae6]/50 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}