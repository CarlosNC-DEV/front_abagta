import { X } from 'lucide-react'

const MobileMenu = ({ isOpen, onClose, activeTab, setActiveTab, tabTitles }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Menú</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-3">
                    {Object.entries(tabTitles).map(([key, title]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveTab(key)
                                onClose()
                            }}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                                activeTab === key
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
    )
}

export default MobileMenu

