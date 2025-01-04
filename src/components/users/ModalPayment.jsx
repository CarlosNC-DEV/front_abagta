import { useState } from 'react';
import { X } from 'lucide-react'
import { confirmPayment } from './domain/service';
import toast from "react-hot-toast";
import Loading from '../loading/Loading';

const ModalPayment = ({ isOpen, onClose, onConfirm, userId, payment }) => {
    
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const response = await confirmPayment(userId);
            if (response.status) {
                toast.success("Pago confirmado correctamente");
                onConfirm();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            toast.error("Error al confirmar el pago");
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h2 className="text-base font-bold text-gray-900">
                        Confirmar Pago
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-6">¿Está seguro de que desea confirmar el pago de {payment.infoDate}?</p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                'Confirmar'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPayment;