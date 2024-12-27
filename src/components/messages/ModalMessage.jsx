import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const ModalMessage = ({ isOpen, onClose, message, onSave }) => {
    const [content, setContent] = useState('')

    useEffect(() => {
        if (message) {
            setContent(message.content || '')
        }
    }, [message])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({ ...message, content })
        onClose()
    }

    const variables = [
        { key: '{nombre}', label: 'nombre', class: 'bg-blue-500 text-white' },
        { key: '{placa}', label: 'placa', class: 'bg-green-500 text-white' },
        { key: '{telefono}', label: 'teléfono', class: 'bg-purple-500 text-white' }
    ]

    const insertVariable = (variable) => {
        setContent(prev => prev + ' ' + variable)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-base font-bold text-gray-900">Editar Mensaje</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Variables disponibles
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {variables.map(({ key, label, class: className }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => insertVariable(key)}
                                    className={`rounded-md ${className} px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message-content" className="block text-sm font-medium text-gray-700 mb-2">
                            Contenido del mensaje
                        </label>
                        <div className="relative">
                            <textarea
                                id="message-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-3 text-gray-700"
                                placeholder="Escribe tu mensaje aquí..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-gray-400">{content.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-primary text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalMessage

