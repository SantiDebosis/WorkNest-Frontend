import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../lib/api';
import { GripVertical, Trash2, User, Calendar } from 'lucide-react';

export default function TaskCard({ task, index, onTaskDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
      index: index,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { isAdmin } = useAuth();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Seguro que quieres borrar la tarea "${task.name}"?`)) {
      try {
        await api.delete(`/tasks/${task.id}`);
        onTaskDelete();
      } catch (err) {
        console.error("Error al borrar tarea:", err);
        alert("Error al borrar la tarea.");
      }
    }
  };

  const formattedDate = new Date(task.dueDate).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-md shadow-sm p-3 cursor-grab active:cursor-grabbing border border-transparent hover:border-[#219ebc]/50 transition-colors duration-150"
    >
      <div className="flex justify-between items-start">
        <span className="text-base font-medium text-[#023047] break-words w-full pr-2">
          {task.name}
        </span>
        <div className="flex-shrink-0 flex items-center">
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="text-[#8ecae6] hover:text-[#fb8500] p-1"
              aria-label="Borrar tarea"
            >
              <Trash2 size={16} />
            </button>
          )}
          <div {...attributes} {...listeners} className="text-[#8ecae6] hover:text-[#219ebc] p-1 touch-none">
            <GripVertical size={16} />
          </div>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-[#219ebc] mt-1 break-words">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#8ecae6]">
        <div className="flex items-center text-xs text-[#219ebc]" title={`Asignado a: ${task.assignedUser.userName}`}>
          <User size={14} className="mr-1" />
          <span>{task.assignedUser.userName.split(' ')[0]}</span> 
        </div>
        <div 
          className={`flex items-center text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-[#219ebc]'}`} 
          title={`Vence: ${formattedDate}`}
        >
          <Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}