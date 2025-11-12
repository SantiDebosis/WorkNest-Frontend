import { useAuth } from '../../context/AuthContext.jsx';
import { Redirect } from 'wouter';
import Spinner from '../ui/Spinner';

export default function AdminRoute({ children }) {
  const { isLoggedIn, isAdminOrMod, loading } = useAuth();

  if (loading) {
    return <Spinner fullPage />;
  }

  if (!isLoggedIn) {
    return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
  }
  
  if (!isAdminOrMod) {
    return <Redirect to="/dashboard" />;
  }

  return children;
}