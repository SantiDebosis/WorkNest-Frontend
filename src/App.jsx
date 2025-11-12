import { Switch, Route, Redirect } from 'wouter';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import { useAuth } from './context/AuthContext.jsx';
import HomePage from './pages/Home';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import BoardListPage from './pages/dashboard/BoardList';
import BoardViewPage from './pages/dashboard/BoardView';
import StatisticsPage from './pages/admin/Statistics';
import UserListPage from './pages/admin/UserList';
import NotFoundPage from './pages/NotFound';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
      </Route>
      <Route path="/register">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <RegisterPage />}
      </Route>
      
      <Route path="/">
        <Layout>
          <HomePage />
        </Layout>
      </Route>

      <Route path="/dashboard">
        <ProtectedRoute>
          <Layout>
            <BoardListPage />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/board/:id">
        <ProtectedRoute>
          <Layout>
            <BoardViewPage />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/statistics">
        <AdminRoute>
          <Layout>
            <StatisticsPage />
          </Layout>
        </AdminRoute>
      </Route>
      <Route path="/admin/users">
        <AdminRoute>
          <Layout>
            <UserListPage />
          </Layout>
        </AdminRoute>
      </Route>

      <Route>
        <Layout>
          <NotFoundPage />
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;