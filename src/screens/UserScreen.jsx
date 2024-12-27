import { useState, useCallback, useMemo } from 'react'
import { Phone, Edit, MessageSquare, UserPlus, SlidersHorizontal, ChevronLeft } from 'lucide-react'
import ModalUsers from '../components/users/ModalUsers'
import MobileMenu from '../components/MobileMenu'
import { useNavigate } from 'react-router-dom'

const initialUsers = [
    {
        id: 1,
        name: 'CARLOS NOGUERA',
        city: 'POPAYAN',
        phone: '3001234567',
        date: '2023-01-01',
        state: 'active'
    },
    {
        id: 2,
        name: 'MARIA NOGUERA',
        city: 'BOGOTA',
        phone: '3009876543',
        date: '2023-02-15',
        state: 'expired'
    },
    {
        id: 3,
        name: 'JUAN NOGUERA',
        city: 'MEDELLIN',
        phone: '3005554444',
        date: '2023-03-30',
        state: 'inDebt'
    },
    {
        id: 4,
        name: 'ANA NOGUERA',
        city: 'CALI',
        phone: '3007778888',
        date: '2023-04-10',
        state: 'expired'
    }
]

const UserScreen = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState(initialUsers)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [activeTab, setActiveTab] = useState('active')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleWhatsApp = useCallback((phone) => {
        window.open(`https://wa.me/${phone}`, '_blank')
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

    const handleSaveUser = useCallback((userData) => {
        setUsers(prevUsers => {
            if (userData.id) {
                return prevUsers.map(user => user.id === userData.id ? { ...user, ...userData, city: userData.address } : user)
            } else {
                const newUser = {
                    id: prevUsers.length + 1,
                    ...userData,
                    city: userData.address
                }
                return [...prevUsers, newUser]
            }
        })
        setIsModalOpen(false)
    }, [])

    const filteredUsers = useMemo(() => users.filter(user => user.state === activeTab), [users, activeTab])

    const tabTitles = {
        active: 'Activos',
        expired: 'Vencidos',
        inDebt: 'En Mora',
        disabled: 'Inhabilitados'
    }

    const UserCard = useCallback(({ user }) => (
        <div key={user.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 space-y-1 sm:mb-0">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.city}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
                <div className="flex justify-end gap-3">
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
    ), [handleWhatsApp, handleCall, handleEdit])

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
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === key
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                                    >
                                        {title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        <h2 className="mb-4 text-xl font-normal text-gray-800">{tabTitles[activeTab]}</h2>
                        <div className="space-y-4">
                            {filteredUsers.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
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
            />

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabTitles={tabTitles}
            />
        </div>
    )
}

export default UserScreen