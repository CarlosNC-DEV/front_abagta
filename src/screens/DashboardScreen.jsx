'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, ChevronRight, Menu, CirclePlus, MessageCircle } from 'lucide-react'
import ModalCategory from '../components/dashboard/ModalCategory'
import BottomSheet from '../components/dashboard/BottomSheet'

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const navigate = useNavigate()

  const categories = [
    { title: 'MENSUAL', duration: '1 MES', users: 10 },
    { title: 'TRIMESTRAL', duration: '3 MESES', users: 30 },
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
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">ABAGTA GPS</h1>
          </div>
          <button
            onClick={() => setIsBottomSheetOpen(true)}
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
          <h2 className="text-xl font-semibold text-gray-600 mb-4">Categorías</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => navigate('/users')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 transition-all hover:bg-gray-100 active:bg-gray-200 hover:shadow-md"
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{category.title}</span>
                  <span className="text-sm text-gray-600">{category.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span className='font-semibold'>{category.users}</span>
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
  )
}

export default Dashboard