export default function Button({
    type = "button",
    children,
    onClick,
    disabled = false,
    isSecondary = false, 
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-2 rounded-lg font-medium ${
          isSecondary
            ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
            : "bg-black text-white hover:bg-opacity-80" 
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} 
      >
        {children}
      </button>
    );
}
