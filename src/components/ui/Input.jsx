import React from 'react';

const Input = React.forwardRef(({ label, id, type = 'text', error, ...props }, ref) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-[#023047]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`mt-1 block w-full px-3 py-2 border ${
          error 
            ? 'border-red-500' 
            : 'border-[#219ebc]/50' 
        } rounded-md shadow-sm focus:outline-none 
        // Focus Ring y Borde en foco: Cian Medio
        focus:ring-[#219ebc] focus:border-[#219ebc] sm:text-sm`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
});

export default Input;