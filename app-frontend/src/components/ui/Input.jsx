export default function Input({ label, id, type = "text", placeholder, value, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
            />
        </div>
    );
}
