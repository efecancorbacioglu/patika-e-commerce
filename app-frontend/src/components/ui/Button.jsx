export default function Button({ type = "button", children, onClick, disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-black text-white w-full py-2 rounded-lg font-medium hover:bg-opacity-90 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {children}
        </button>
    );
}
