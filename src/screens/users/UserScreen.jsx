"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Phone, Edit, MessageSquare, UserPlus, SlidersHorizontal, ChevronLeft, Calendar, Search } from "lucide-react"
import ModalUsers from "../../components/users/ModalUsers"
import MobileMenu from "../../components/MobileMenu"
import ModalPayment from "../../components/users/ModalPayment"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsersByCategory } from "./domain/services"

const UserScreen = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [activeTab, setActiveTab] = useState("A")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, userId: null, payment: null })
  const [searchTerm, setSearchTerm] = useState("")

  const handleWhatsApp = useCallback((phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
    window.open(`https://api.whatsapp.com/send?phone=${formattedPhone}`, "_blank");
  }, [])

  const handleCall = useCallback((phone) => {
    window.location.href = `tel:${phone}`
  }, [])

  const handleEdit = useCallback((user) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }, [])

  const handleCreateUser = useCallback(() => {
    setEditingUser(null)
    setIsModalOpen(true)
  }, [])

  const handleSaveUser = useCallback(() => {
    getAllUsers()
    setIsModalOpen(false)
  }, [])

  const handlePaymentConfirmation = useCallback((userId, payment) => {
    setConfirmationModal({ isOpen: true, userId, payment })
  }, [])

  const handleConfirmPayment = useCallback(() => {
    getAllUsers()
  }, [])

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  useEffect(() => {
    if (categoryId) {
      getAllUsers()
    }
  }, [categoryId])

  const getAllUsers = async () => {
    setIsLoading(true)
    try {
      const response = await getAllUsersByCategory(categoryId)
      if (response.status) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUsers = useMemo(() => {
    // First filter by active tab
    const statusFiltered = users.filter((user) => user.status === activeTab)

    // Then filter by search term if it exists
    if (!searchTerm.trim()) return statusFiltered

    const searchLower = searchTerm.toLowerCase()
    return statusFiltered.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.plate?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.address?.toLowerCase().includes(searchLower),
    )
  }, [users, activeTab, searchTerm])

  const tabTitles = {
    A: "Activos",
    V: "Vencidos",
    M: "En Mora",
    I: "Inhabilitados",
  }

  const UserCard = useCallback(
    ({ user }) => (
      <div
        key={user.id}
        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md animate-fade-in"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 space-y-1 sm:mb-0">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.phone}</p>
            <p className="text-sm text-gray-600">{user.address}</p>
            {user.activePayment && (
              <button
                onClick={() => handlePaymentConfirmation(user.id, user.activePayment)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Pago pendiente: {user.activePayment.infoDate}
              </button>
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="inline-block bg-yellow-400 rounded-lg px-3 py-1 border-2 border-black shadow-md">
              <p className="text-black font-bold tracking-wider">{user.plate}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleWhatsApp(user.phone)}
                className="rounded-full bg-green-500 p-2 text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleCall(user.phone)}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                aria-label="Llamar"
              >
                <Phone className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleEdit(user)}
                className="rounded-full bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                aria-label="Editar"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    [handleWhatsApp, handleCall, handleEdit, handlePaymentConfirmation],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="sticky top-0 z-10 mb-4">
          <div className="bg-secondary bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate(-1)}
                    className="mr-4 p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    aria-label="Volver"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <span className="text-base font-semibold text-white">Gestión de Usuarios</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="rounded-full bg-white p-2 text-primary shadow-lg transition-colors hover:bg-gray-100 md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  aria-label="Abrir menú"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-xl animate-slide-up">
          <div className="border-b border-gray-200 p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleCreateUser}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                <UserPlus className="h-4 w-4" />
                Crear Usuario
              </button>
              <div className="hidden md:flex md:space-x-2 overflow-x-auto pb-2">
                {Object.entries(tabTitles).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === key ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <h2 className="text-xl font-normal text-gray-800">{tabTitles[activeTab]}</h2>
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  aria-label="Buscar usuarios"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
                ) : (
                  <p className="text-center text-gray-500">
                    {searchTerm ? "No se encontraron usuarios con esa búsqueda" : "Sin usuarios en esta categoría"}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalUsers
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(null)
        }}
        onSave={handleSaveUser}
        user={editingUser}
        categoryId={categoryId}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabTitles={tabTitles}
      />

      <ModalPayment
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ isOpen: false, userId: null, payment: null })}
        onConfirm={handleConfirmPayment}
        userId={confirmationModal.userId}
        payment={confirmationModal.payment}
      />
    </div>
  )
}

export default UserScreen