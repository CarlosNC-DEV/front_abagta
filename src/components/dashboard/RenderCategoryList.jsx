import { Users, ChevronRight, Edit } from "lucide-react";

const RenderCategoryList = ({
  isLoading,
  error,
  categories,
  handleNavigateToUsers,
  handleEditCategory,
}) => {
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-2 text-gray-600">Categorías...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-red-100 rounded-full p-4 mb-4">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-lg text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <svg
            className="h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-lg text-gray-600 font-medium">
          No hay categorías creadas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.id} className="flex gap-2">
          <button
            onClick={() => handleNavigateToUsers(category.id)}
            className="flex-1 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 transition-all hover:bg-gray-100 active:bg-gray-200 hover:shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">{category.name}</span>
              <span className="text-sm text-gray-600">
                {category.duration} meses
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="mr-2 h-4 w-4" />
              <span className="font-semibold">{category.users}</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </div>
          </button>
          <button
            onClick={(e) => handleEditCategory(category, e)}
            className="flex items-center justify-center px-3 rounded-xl border border-gray-200 bg-gray-50 text-primary hover:bg-gray-100 active:bg-gray-200 hover:shadow-md transition-all"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RenderCategoryList;
