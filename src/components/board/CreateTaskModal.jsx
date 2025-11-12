import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema } from '../../lib/schemas';
import api from '../../lib/api';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function CreateTaskModal({ isOpen, onClose, columns, onTaskCreated }) {
  const [users, setUsers] = useState([]);
  const [apiError, setApiError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          const { data } = await api.get('/auth/users');
          setUsers(data);
        } catch (err) {
          console.error("Error cargando usuarios:", err);
          setApiError("No se pudo cargar la lista de usuarios.");
        }
      };
      fetchUsers();
    } else {
      reset();
      setApiError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      await api.post('/tasks', data);
      onTaskCreated();
      onClose();
    } catch (err) {
      console.error("Error creando tarea:", err);
      setApiError(err.response?.data?.message || "Error al crear la tarea.");
    }
  };

  const defaultDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Tarea">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {apiError && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            {apiError}
          </div>
        )}

        <Input
          id="name"
          label="Nombre de la Tarea"
          error={errors.name}
          {...register("name")}
        />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción (Opcional)
          </label>
          <textarea
            id="description"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register("description")}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="dueDate"
            label="Fecha Límite"
            type="datetime-local"
            defaultValue={defaultDueDate}
            error={errors.dueDate}
            {...register("dueDate")}
          />
          
          <div>
            <label htmlFor="columnId" className="block text-sm font-medium text-gray-700">
              Columna Inicial
            </label>
            <select
              id="columnId"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              {...register("columnId")}
              defaultValue={columns.length > 0 ? columns[0].id : ""}
            >
              {columns.map(col => (
                <option key={col.id} value={col.id}>{col.name}</option>
              ))}
            </select>
            {errors.columnId && <p className="mt-1 text-xs text-red-600">{errors.columnId.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="assignedUserId" className="block text-sm font-medium text-gray-700">
            Asignar a
          </label>
          <select
            id="assignedUserId"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register("assignedUserId")}
          >
            <option value="">Selecciona un usuario...</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.userName} ({user.email})</option>
            ))}
          </select>
          {errors.assignedUserId && <p className="mt-1 text-xs text-red-600">{errors.assignedUserId.message}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Crear Tarea
          </Button>
        </div>
      </form>
    </Modal>
  );
}