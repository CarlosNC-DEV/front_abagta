import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, MessageSquare, Users, ChevronRight, Menu } from 'lucide-react'
import ModalCategory from '../components/dashboard/ModalCategory'
import BottomSheet from '../components/dashboard/BottomSheet'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const navigate = useNavigate()

  const categories = [
    { title: 'MENSUAL', duration: '1 MES', users: 150 },
    { title: 'SEMESTRAL', duration: '6 MESES', users: 80 },
    { title: 'ANUAL', duration: '12 MESES', users: 30 }
  ]

  const handleCreateCategory = () => {
    setIsModalOpen(true)
    setIsBottomSheetOpen(false)
  }

  const handleNavigateToMessages = () => {
    navigate('/messages')
    setIsBottomSheetOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard ABAGTA GPS</h1>
            <p className="text-lg text-white/80">Sistema de Gestión</p>
          </div>
          <button
            onClick={() => setIsBottomSheetOpen(true)}
            className="md:hidden bg-white text-primary p-2 rounded-full shadow-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="hidden md:flex space-x-4 mb-8">
          <button
            onClick={handleCreateCategory}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-primary font-semibold transition-colors hover:bg-gray-100 active:bg-gray-200 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Crear Categoría
          </button>
          <button
            onClick={handleNavigateToMessages}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-primary font-semibold transition-colors hover:bg-gray-100 active:bg-gray-200 shadow-lg"
          >
            <MessageSquare className="h-5 w-5" />
            Mensajes Personalizados
          </button>
        </div>

        <div className="bg-gray-100 rounded-3xl shadow-xl p-4 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorías</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => navigate('/users')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 transition-colors hover:bg-gray-200 active:bg-gray-300"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{category.title}</span>
                  <span className="text-sm text-gray-600">{category.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{category.users}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ModalCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <div className="space-y-6">
          <div className="space-y-2">
            <button
              onClick={handleCreateCategory}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary rounded-xl shadow-sm text-white font-semibold transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Crear Categoría
              </span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleNavigateToMessages}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary rounded-xl shadow-sm text-white font-semibold transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mensajes Personalizados
              </span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}

export default Dashboard

