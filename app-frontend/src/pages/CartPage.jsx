import { useState } from "react";

const initialCart = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xl font-bold hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xl font-bold hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="mt-6 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-opacity-90"
          onClick={() => alert("Proceeding to checkout...")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
