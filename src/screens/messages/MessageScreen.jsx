import { useEffect, useState } from "react";
import { Edit, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ModalMessage from "../../components/messages/ModalMessage";
import { getAllMessages } from "./domain/service";

const MessageScreen = () => {
    const [openMessageId, setOpenMessageId] = useState(null);
    const [editingMessage, setEditingMessage] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleViewClick = (messageId) => {
        setOpenMessageId(openMessageId === messageId ? null : messageId);
    };

    const handleEditClick = (message) => {
        setEditingMessage(message);
    };

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        setIsLoading(true);
        try {
            const response = await getAllMessages();
            if (response.status) {
                setMessagesList(response.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getHighlightedContent = (content) => {
        const variables = [
            { key: "{nombre}", class: "text-blue-600 bg-blue-100" },
            { key: "{placa}", class: "text-green-600 bg-green-100" },
            { key: "{telefono}", class: "text-purple-600 bg-purple-100" },
        ];

        let highlightedContent = content;
        variables.forEach(({ key, class: className }) => {
            highlightedContent = highlightedContent.replace(
                new RegExp(key, "g"),
                `<span class="${className} px-1 py-0.5 rounded-md font-medium">${key}</span>`
            );
        });

        return <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="sticky top-3 z-10 mb-6">
                    <div className="bg-secondary bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-lg">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-14">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="mr-4 p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                        <span className="sr-only">Volver</span>
                                    </button>
                                    <span className="text-base font-semibold text-white">
                                        Mensajes Personalizados
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-white text-center mb-6">
                    Gestiona los mensajes automáticos para diferentes momentos del ciclo
                    de pago
                </p>
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                            <span className="ml-2 text-gray-600">Mensajes...</span>
                        </div>
                    ) : (
                        messagesList.map((message) => (
                            <div
                                key={message.id}
                                className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md bg-gray-50"
                            >
                                <div className="flex items-center justify-between px-6 py-4">
                                    <span className="text-gray-800 font-medium">
                                        {message.dayInfo}
                                    </span>
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
                                                {openMessageId === message.id
                                                    ? "Ocultar mensaje"
                                                    : "Ver mensaje"}
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
                                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {getHighlightedContent(message.description)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ModalMessage
                isOpen={!!editingMessage}
                onClose={() => setEditingMessage(null)}
                message={editingMessage}
                onSave={getMessages}
            />
        </div>
    );
};

export default MessageScreen;