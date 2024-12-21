import { useState } from 'react'
import { Edit, ChevronDown, ChevronUp } from 'lucide-react'
import ModalMessage from '../components/messages/ModalMessage'

const messages = [
    {
        id: 1,
        timing: '1 día antes',
        content: 'Hola {nombre}, recordamos que su vehículo con placa {placa} tiene un pago pendiente. Contacto: {telefono}'
    },
    {
        id: 2,
        timing: 'Día base',
        content: 'Mensaje para el día base'
    },
    {
        id: 3,
        timing: '3 días después',
        content: 'Mensaje para 3 días después'
    },
    {
        id: 4,
        timing: '6 días después',
        content: 'Mensaje para 6 días después'
    },
    {
        id: 5,
        timing: '9 días después',
        content: 'Mensaje para 9 días después'
    }
]

const MessageScreen = () => {
    const [openMessageId, setOpenMessageId] = useState(null)
    const [editingMessage, setEditingMessage] = useState(null)
    const [messagesList, setMessagesList] = useState(messages)

    const handleViewClick = (messageId) => {
        setOpenMessageId(openMessageId === messageId ? null : messageId)
    }

    const handleEditClick = (message) => {
        setEditingMessage(message)
    }

    const handleSaveMessage = (updatedMessage) => {
        setMessagesList(prev =>
            prev.map(msg =>
                msg.id === updatedMessage.id ? updatedMessage : msg
            )
        )
        setEditingMessage(null)
    }

    const getHighlightedContent = (content) => {
        const variables = [
            { key: '{nombre}', class: 'bg-primary/20 text-primary-dark' },
            { key: '{placa}', class: 'bg-secondary/20 text-secondary-dark' },
            { key: '{telefono}', class: 'bg-primary/20 text-primary-dark' }
        ]

        let highlightedContent = content
        variables.forEach(({ key, class: className }) => {
            highlightedContent = highlightedContent.replace(
                new RegExp(key, 'g'),
                `<span class="${className} px-1 py-0.5 rounded-md font-medium">${key}</span>`
            )
        })

        return <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Mensajes Personalizados</h1>
                    <p className="text-white">Gestiona los mensajes automáticos para diferentes momentos del ciclo de pago</p>
                </header>
                <div className="bg-white rounded-2xl shadow-xl p-4 space-y-4">
                    {messagesList.map((message) => (
                        <div
                            key={message.id}
                            className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md"
                        >
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                                <span className="text-gray-800 font-medium">{message.timing}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewClick(message.id)}
                                        className="flex items-center justify-center rounded-full w-8 h-8 bg-primary text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        aria-expanded={openMessageId === message.id}
                                    >
                                        {openMessageId === message.id ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                        <span className="sr-only">
                                            {openMessageId === message.id ? 'Ocultar mensaje' : 'Ver mensaje'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(message)}
                                        className="flex items-center justify-center rounded-full w-8 h-8 bg-secondary text-white transition-colors hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Editar mensaje</span>
                                    </button>
                                </div>
                            </div>
                            {openMessageId === message.id && (
                                <div className="px-4 py-3 bg-white border-t border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {getHighlightedContent(message.content)}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <ModalMessage
                isOpen={!!editingMessage}
                onClose={() => setEditingMessage(null)}
                message={editingMessage}
                onSave={handleSaveMessage}
            />
        </div>
    )
}

export default MessageScreen

