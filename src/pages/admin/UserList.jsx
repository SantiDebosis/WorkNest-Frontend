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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#023047]">Gestión de Usuarios</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-[#8ecae6]">
          <thead className="bg-[#8ecae6]/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#8ecae6]">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#023047]">
                  {user.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#219ebc]">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
