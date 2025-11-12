export default function Button({ children, type = 'button', variant = 'primary', className = '', isLoading = false, ...props }) {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "text-[#023047] bg-[#ffb703] hover:bg-[#fb8500] focus:ring-[#219ebc]", 
    secondary: "text-white bg-[#219ebc] hover:bg-[#023047] focus:ring-[#219ebc]", 
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${baseStyle} ${variants[variant]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}