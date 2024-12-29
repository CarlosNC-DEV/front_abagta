import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createCategories, updateCategory } from "./domain/services";
import toast from "react-hot-toast";

const ModalCategory = ({
  isOpen,
  onClose,
  handleCategoryCreated,
  category = null,
}) => {
  const initialState = { name: "", duration: "" };
  const [formData, setFormData] = useState(initialState);
  const isEditing = Boolean(category);

  // Cuando cambia la categoría seleccionada, actualizamos el formulario
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        duration: category.duration.toString(),
      });
    } else {
      setFormData(initialState);
    }
  }, [category]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.duration <= 0) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    const categoryData = {
      ...formData,
      duration: parseInt(formData.duration),
    };

    try {
      let response;
      if (isEditing) {
        response = await updateCategory(category.id, categoryData);
        if (response.status) {
          toast.success("Categoría actualizada correctamente");
        }
      } else {
        response = await createCategories(categoryData);
        if (response.status) {
          toast.success("Categoría creada correctamente");
        }
      }

      if (response.status) {
        resetForm();
        onClose();
        handleCategoryCreated();
      } else {
        toast.error(
          response.message ||
            `Error al ${isEditing ? "actualizar" : "crear"} la categoría`
        );
      }
    } catch (error) {
      console.error(
        `Error al ${isEditing ? "actualizar" : "crear"} categoría:`,
        error
      );
      toast.error(
        `Error al ${isEditing ? "actualizar" : "crear"} la categoría`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-900">
            {isEditing ? "Editar Categoría" : "Crear Categoría"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="relative">
            <input
              id="title"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="block w-full rounded-xl border-2 border-gray-300 bg-white px-4 pt-5 pb-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-0 peer text-base"
              placeholder=" "
            />
            <label
              htmlFor="title"
              className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary"
            >
              Título
            </label>
          </div>
          <div className="relative">
            <input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="block w-full rounded-xl border-2 border-gray-300 bg-white px-4 pt-5 pb-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-0 peer text-base"
              placeholder=" "
            />
            <label
              htmlFor="duration"
              className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary"
            >
              Duración (Meses)
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base transition-colors"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCategory;
