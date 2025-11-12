import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'wouter';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBoardSchema } from '../../lib/schemas';
import Input from '../../components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';

export default function BoardListPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAdminOrMod } = useAuth();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createBoardSchema),
  });

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/boards');
      setBoards(response.data);
    } catch (err) {
      setError("No se pudieron cargar los tableros.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const onBoardCreate = async (data) => {
    try {
      await api.post('/boards', data);
      await fetchBoards();
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error("Error creando tablero:", err);
    }
  };

  const handleDeleteBoard = async (e, boardId, boardName) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`¿Seguro que quieres eliminar el tablero "${boardName}"? Esta acción no se puede deshacer.`)) {
      try {
        await api.delete(`/boards/${boardId}`);
        await fetchBoards();
      } catch (err) {
        console.error("Error eliminando tablero:", err);
        alert("Error al eliminar el tablero.");
      }
    }
  };

  if (loading) return <Spinner />; 
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#023047]">Mis Tableros</h1> 
        {isAdminOrMod && (
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
          >
            <Plus size={20} className="mr-2" />
            Crear Tablero
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boards.map(board => (
          <Link key={board.id} href={`/board/${board.id}`}>
            <a className="relative block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              {isAdminOrMod && (
                <button
                  onClick={(e) => handleDeleteBoard(e, board.id, board.name)}
                  className="absolute top-2 right-2 text-[#8ecae6] hover:text-[#fb8500] p-1 rounded-full hover:bg-red-100/50 transition-colors"
                  aria-label="Eliminar tablero"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <h3 className="text-xl font-semibold text-[#219ebc] pr-6">{board.name}</h3> 
            </a>
          </Link>
        ))}
        {boards.length === 0 && (
          <p className="text-[#023047]/70">No hay tableros. ¡Crea uno!</p> 
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Crear Nuevo Tablero"
      >
        <form onSubmit={handleSubmit(onBoardCreate)} className="space-y-4">
          <Input
            id="name"
            label="Nombre del Tablero"
            error={errors.name}
            {...register("name")}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                className="bg-[#8ecae6] hover:bg-[#219ebc] text-[#023047] transition duration-300"
            >
              Cancelar
            </Button>
            <Button 
                type="submit" 
                variant="primary" 
                isLoading={isSubmitting}
                className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold transition duration-300"
            >
              Crear
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
