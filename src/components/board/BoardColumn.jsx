import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export default function BoardColumn({ column, tasks, onTaskDelete }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-72 bg-white/70 rounded-lg shadow-md p-3" 
    >
      <h3 className="text-lg font-semibold text-[#023047] mb-4 px-1">
        {column.name} ({tasks.length})
      </h3>

      <SortableContext
        id={column.id.toString()} 
        items={tasks.map(t => t.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 min-h-[100px]">
          {tasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task}
              index={index}
              onTaskDelete={onTaskDelete} 
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}