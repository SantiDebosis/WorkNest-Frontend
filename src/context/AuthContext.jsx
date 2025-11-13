import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';
import Spinner from '../components/ui/Spinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al leer localStorage", error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error.response?.data);
      return { success: false, error: error.response?.data?.message || "Error al iniciar sesión" };
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error.response?.data);
      return { success: false, error: error.response?.data?.message || "Error al registrar" };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Error en API logout (se forzará local):", error.response?.data);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  };

  const authValues = {
    user,
    token,
    isLoggedIn: !!token, 
    isAdmin: user?.roles?.includes('Admin'),
    login,
    register,
    logout,
    loading,
  }; 

  if (loading) {
    return <Spinner fullPage />;
  }

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext); 
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};