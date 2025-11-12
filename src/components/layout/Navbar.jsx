import { Link, useLocation } from 'wouter';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button';
import { LogOut, LayoutDashboard, Users, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn, isAdminOrMod, user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <span className="font-bold text-xl text-[#ffb703]">WorkNest</span> 
          </Link>
          {isLoggedIn && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavLink href="/dashboard">
                <LayoutDashboard size={18} className="mr-1 text-white" />
                Tableros
              </NavLink>
              
              {isAdminOrMod && (
                <>
                  <NavLink href="/admin/statistics">
                    <BarChart3 size={18} className="mr-1 text-white" />
                    Estadísticas
                  </NavLink>
                  <NavLink href="/admin/users">
                    <Users size={18} className="mr-1 text-white" />
                    Usuarios
                  </NavLink>
                </>
              )}
            </div>
          )}

          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-[#219ebc] hidden sm:block"> 
                  Hola, <span className="font-medium text-[#023047]">{user.userName}</span>
                </span>
                <Button 
                    onClick={handleLogout} 
                    variant="secondary" 
                    className="px-2 py-1 bg-[#219ebc] hover:bg-[#023047] text-white transition duration-300"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link href="/login">
                  <Button 
                    variant="secondary" 
                    className="bg-[#219ebc] hover:bg-[#023047] text-white transition duration-300"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="primary"
                    className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ href, children }) => {
  const [isActive] = useLocation(href);
  return (
    <Link 
      href={href}
      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-[#8ecae6]/70 text-white font-bold'
          : 'text-[#023047] hover:bg-[#8ecae6]/50' 
      }`}
    >
      {children}
    </Link>
  );
};