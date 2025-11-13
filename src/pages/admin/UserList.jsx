import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/auth/users');
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  const getRoleColors = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-[#fb8500]/20 text-[#fb8500]';
      default:
        return 'bg-[#219ebc]/20 text-[#023047]'; 
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#023047]">Gestión de Usuarios</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-[#8ecae6]">
          <thead className="bg-[#8ecae6]/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Roles</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#8ecae6]">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#219ebc]">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#023047]">{user.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#219ebc]">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles.map(role => (
                    <span 
                      key={role} 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColors(role)}`}
                    >
                      {role}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}