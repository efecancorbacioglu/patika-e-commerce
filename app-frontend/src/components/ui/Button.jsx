export default function Button({ type = "button", children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-black text-white w-full py-2 rounded-lg font-medium hover:bg-opacity-90"
        >
            {children}
        </button>
    );
}
