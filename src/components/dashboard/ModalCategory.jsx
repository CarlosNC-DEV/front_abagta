import { useState } from 'react'
import { X } from 'lucide-react'

const ModalCategory = ({ isOpen, onClose }) => {
    const [category, setCategory] = useState({ title: '', duration: '' })

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle category creation logic here
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Crear Categoría</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            id="title"
                            type="text"
                            value={category.title}
                            onChange={(e) => setCategory({ ...category, title: e.target.value })}
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
                            type="text"
                            value={category.duration}
                            onChange={(e) => setCategory({ ...category, duration: e.target.value })}
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
                            className="px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base transition-colors"
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalCategory

