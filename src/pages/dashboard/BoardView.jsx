import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import api from '../../lib/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import BoardColumn from '../../components/board/BoardColumn';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import CreateTaskModal from '../../components/board/CreateTaskModal';
import { Plus } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';

export default function BoardViewPage() {
  const [, params] = useRoute("/board/:id");
  const boardId = params.id;
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdminOrMod } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchBoard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/boards/${boardId}`);
      data.columns.sort((a, b) => a.order - b.order);
      setBoard(data);
      setColumns(data.columns);
      const tasksByColumn = data.columns.reduce((acc, col) => {
        col.tasks.sort((a,b) => a.id - b.id);
        acc[col.id] = col.tasks;
        return acc;
      }, {});
      setTasks(tasksByColumn);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return; 

    const activeId = active.id;
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer === overContainer) {
      setTasks(prev => {
        const activeIndex = prev[activeContainer].findIndex(t => t.id === activeId);
        const overIndex = prev[activeContainer].findIndex(t => t.id === over.id);
        return {
          ...prev,
          [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
        }
      });
      return;
    }

    const targetColumnId = parseInt(overContainer);
    const taskToMove = tasks[activeContainer].find(t => t.id === activeId);
    setTasks(prev => {
      const sourceTasks = prev[activeContainer].filter(t => t.id !== activeId);
      const destinationTasks = [...prev[overContainer], taskToMove];
      return { ...prev, [activeContainer]: sourceTasks, [overContainer]: destinationTasks };
    });

    try {
      await api.patch(`/tasks/${activeId}/move`, { targetColumnId });
    } catch (err) {
      console.error("Error al mover la tarea:", err);
      alert("Error al mover la tarea. Recargando...");
      await fetchBoard();
    }
  };

  if (loading) return <Spinner />;
  if (!board) return <p>Tablero no encontrado.</p>;

  const normalizedSearch = searchTerm.toLowerCase();

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#023047]">{board.name}</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Buscar tareas (nombre, desc, usuario)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full md:w-64 px-4 py-2 border border-[#219ebc]/50 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring-[#219ebc] focus:border-[#219ebc] sm:text-sm"
            />
          </div>
          {isAdminOrMod && (
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300 flex-shrink-0"
            >
              <Plus size={20} className="mr-2" />
              Nueva Tarea
            </Button>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(col => {
            const filteredTasks = (tasks[col.id] || []).filter(task => 
              task.name.toLowerCase().includes(normalizedSearch) ||
              task.description?.toLowerCase().includes(normalizedSearch) ||
              task.assignedUser.userName.toLowerCase().includes(normalizedSearch)
            );

            return (
              <BoardColumn
                key={col.id}
                column={col}
                tasks={filteredTasks}
                onTaskDelete={fetchBoard}
              />
            );
          })}
        </div>
      </DndContext>
      
      <CreateTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columns={columns}
        onTaskCreated={fetchBoard}
      />
    </div>
  );
}
