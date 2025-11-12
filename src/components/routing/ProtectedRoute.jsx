import { useAuth } from '../../context/AuthContext.jsx';
import { Redirect } from 'wouter';
import Spinner from '../ui/Spinner';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Spinner fullPage />;
  }

  if (!isLoggedIn) {
    return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
  }

  return children;
}