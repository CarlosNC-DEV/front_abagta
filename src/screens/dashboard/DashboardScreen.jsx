import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Menu, CirclePlus, MessageCircle } from "lucide-react";
import ModalCategory from "../../components/dashboard/ModalCategory";
import BottomSheet from "../../components/dashboard/BottomSheet";
import { allCategories, deleteCategoriesById } from "./domain/service";
import RenderCategoryList from "../../components/dashboard/RenderCategoryList";

const DashboardScreen = () => {
  // Estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  // Manejadores de eventos
  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
    setIsBottomSheetOpen(false);
  };

  const handleEditCategory = (category, e) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (category, e) => {
    try {
      e.stopPropagation();
      setIsLoading(true);
      setError(null);
      const result = await deleteCategoriesById(category.id);
      if (result.status) {
        handleCategoryCreated();
      }
    } catch (error) {
      setError("Error al eliminar la categoría");
      console.error("Error al eliminar la categoría:", error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleNavigateToMessages = () => {
    navigate("/messages");
    setIsBottomSheetOpen(false);
  };

  const handleNavigateToUsers = (categoryId) => {
    navigate(`/users/${categoryId}`);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Obtener categorías
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await allCategories();
      if (response) {
        setCategories(response.data);
      } else {
        setError("Error al procesar las categorías");
        console.error("Error al procesar categorías:", response.message);
      }
    } catch (error) {
      setError("Error al cargar las categorías");
      console.error("Error al obtener categorías:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryCreated = () => {
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              ABAGTA GPS
            </h1>
          </div>
          <button
            onClick={handleOpenBottomSheet}
            className="md:hidden bg-white text-primary p-2 rounded-full shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="hidden md:flex space-x-4 mb-8">
          <button
            onClick={handleCreateCategory}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-primary font-semibold transition-all hover:bg-gray-100 active:bg-gray-200 shadow-lg hover:shadow-xl"
          >
            <CirclePlus className="h-5 w-5" />
            Crear Categoría
          </button>
          <button
            onClick={handleNavigateToMessages}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-primary font-semibold transition-all hover:bg-gray-100 active:bg-gray-200 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Mensajes Personalizados
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Categorías
          </h2>
          <RenderCategoryList
            isLoading={isLoading}
            error={error}
            categories={categories}
            handleNavigateToUsers={handleNavigateToUsers}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        </div>
      </div>

      <ModalCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCategoryCreated={handleCategoryCreated}
        category={selectedCategory}
      />

      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <div className="space-y-6 p-4">
          <div className="space-y-3">
            <button
              onClick={handleCreateCategory}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary rounded-xl shadow-sm text-white font-semibold transition-all hover:bg-primary-dark active:bg-primary-darker"
            >
              <span className="flex items-center gap-2">
                <CirclePlus className="h-5 w-5" />
                Crear Categoría
              </span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleNavigateToMessages}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary rounded-xl shadow-sm text-white font-semibold transition-all hover:bg-primary-dark active:bg-primary-darker"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Mensajes Personalizados
              </span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default DashboardScreen;
