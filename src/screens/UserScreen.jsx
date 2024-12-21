import { useState } from 'react'
import { Phone, Edit, MessageSquare, UserPlus, ArrowLeft, Menu } from 'lucide-react'
import ModalUsers from '../components/users/ModalUsers'
import MobileMenu from '../components/MobileMenu'

const initialUsers = [
    {
        id: 1,
        name: 'CARLOS',
        city: 'POPAYAN',
        phone: '3001234567',
        date: '2023-01-01',
        state: 'active'
    },
    {
        id: 2,
        name: 'MARIA',
        city: 'BOGOTA',
        phone: '3009876543',
        date: '2023-02-15',
        state: 'expired'
    },
    {
        id: 3,
        name: 'JUAN',
        city: 'MEDELLIN',
        phone: '3005554444',
        date: '2023-03-30',
        state: 'inDebt'
    },
    {
        id: 4,
        name: 'ANA',
        city: 'CALI',
        phone: '3007778888',
        date: '2023-04-10',
        state: 'disabled'
    }
]

const UserScreen = () => {
    const [users, setUsers] = useState(initialUsers)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [activeTab, setActiveTab] = useState('active')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleWhatsApp = (phone) => {
        window.open(`https://wa.me/${phone}`, '_blank')
    }

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`
    }

    const handleEdit = (user) => {
        setEditingUser(user)
        setIsModalOpen(true)
    }

    const handleCreateUser = () => {
        setEditingUser(null)
        setIsModalOpen(true)
    }

    const handleSaveUser = (userData) => {
        if (userData.id) {
            setUsers(users.map(user => user.id === userData.id ? { ...user, ...userData, city: userData.address } : user))
        } else {
            const newUser = {
                id: users.length + 1,
                ...userData,
                city: userData.address
            }
            setUsers([...users, newUser])
        }
        setIsModalOpen(false)
    }

    const filteredUsers = users.filter(user => user.state === activeTab)

    const tabTitles = {
        active: 'Usuarios Activos',
        expired: 'Usuarios Vencidos',
        inDebt: 'Usuarios en Mora',
        disabled: 'Usuarios Inhabilitados'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white md:text-3xl">Gestión de Usuarios</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="rounded-full bg-white p-2 text-primary shadow-lg transition-colors hover:bg-gray-100 md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menú</span>
                    </button>
                </header>

                <div className="rounded-2xl bg-white shadow-xl">
                    <div className="border-b border-gray-200 p-4 md:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <button
                                onClick={handleCreateUser}
                                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                            >
                                <UserPlus className="h-4 w-4" />
                                Crear Usuario
                            </button>
                            <div className="hidden md:flex md:space-x-2">
                                {Object.entries(tabTitles).map(([key, title]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === key
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">{tabTitles[activeTab]}</h2>
                        <div className="space-y-4">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="mb-4 space-y-1 sm:mb-0">
                                            <p className="font-medium text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.city}</p>
                                            <p className="text-sm text-gray-600">{user.phone}</p>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => handleWhatsApp(user.phone)}
                                                className="rounded-full bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
                                            >
                                                <MessageSquare className="h-5 w-5" />
                                                <span className="sr-only">WhatsApp</span>
                                            </button>
                                            <button
                                                onClick={() => handleCall(user.phone)}
                                                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                                            >
                                                <Phone className="h-5 w-5" />
                                                <span className="sr-only">Llamar</span>
                                            </button>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="rounded-full bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600"
                                            >
                                                <Edit className="h-5 w-5" />
                                                <span className="sr-only">Editar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {activeTab !== 'active' && (
                        <div className="border-t border-gray-200 p-4 md:p-6">
                            <button
                                onClick={() => setActiveTab('active')}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Volver a Usuarios Activos
                            </button>
                        </div>
                    )}
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

