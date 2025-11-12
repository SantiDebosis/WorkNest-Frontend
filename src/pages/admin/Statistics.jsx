import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { CheckCircle, Clock, AlertTriangle, Archive, Users } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/statistics/dashboard');
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-[#023047]/70">No hay datos.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#023047]">Estadísticas del Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Tareas Totales"
          value={stats.totalTasks}
          icon={<Archive className="text-[#219ebc]" />} 
          iconBgClass="bg-[#8ecae6]"
        />
        <StatsCard 
          title="Completadas"
          value={stats.tasksDone}
          icon={<CheckCircle className="text-green-500" />} 
          iconBgClass="bg-green-100"
        />
        <StatsCard 
          title="En Progreso"
          value={stats.tasksInProgress}
          icon={<Clock className="text-yellow-500" />} 
          iconBgClass="bg-yellow-100"
        />
        <StatsCard 
          title="Vencidas"
          value={stats.tasksOverdue}
          icon={<AlertTriangle className="text-red-500" />} 
          iconBgClass="bg-red-100"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-[#023047]">
          <Users className="mr-2 text-[#219ebc]" />
          Tareas Activas por Usuario
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#8ecae6]">
            <thead className="bg-[#8ecae6]/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#023047] uppercase">Tareas Activas</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#8ecae6]">
              {stats.tasksPerUser.map(user => (
                <tr key={user.email}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#023047]">{user.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#219ebc]">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#219ebc]">{user.activeTasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon, iconBgClass = 'bg-[#8ecae6]' }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
    <div className={`flex-shrink-0 p-3 rounded-full ${iconBgClass}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-[#219ebc] truncate">{title}</p>
      <p className="text-3xl font-semibold text-[#023047]">{value}</p> 
    </div>
  </div>
);