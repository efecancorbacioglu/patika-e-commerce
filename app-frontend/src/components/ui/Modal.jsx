import Button from "./Button";

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    message,
    title = "Confirm Your Action",
    isHaveCancelButton = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                {/* Dinamik Title */}
                <h2 className="text-lg font-bold mb-4">{title}</h2>

                {/* Mesaj */}
                <p className="text-gray-600 mb-6">{message || "Are you sure you want to proceed?"}</p>

                {/* Confirm ve Cancel Butonları */}
                <div className="flex justify-end gap-4">
                    {isHaveCancelButton && (
                        <Button
                            isSecondary={true}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}
