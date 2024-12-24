import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get("api/basket/get");
      const cart = response.data || [];
      setCartItems(cart);
    } catch (error) {
      console.error("Sepet verisi alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.productId === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      await axios.post("api/basket/update", {
        productId: id,
        quantity: newQuantity,
      });
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productId === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Miktar güncellenemedi:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.post("api/basket/remove", { productId: id });
      setCartItems((prevCart) => prevCart.filter((item) => item.productId !== id));
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    try {
      const orderData = {
        userId:  user.id,
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
  
      const response = await axios.post("api/orders/create", orderData);
  
      if (response.status === 200 || response.status === 201) {
        alert("Order placed successfully!");
        setCartItems([]);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while placing the order.");
    } finally {
      setIsModalOpen(false);
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">
                  {Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(item.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                disabled={item.quantity <= 1}
                onClick={() => handleQuantityChange(item.productId, -1)}
                className={`w-8 h-8 rounded flex items-center justify-center text-xl font-bold ${item.quantity <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-gray-200 text-black hover:bg-gray-300" 
                  }`}
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.productId, 1)}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xl font-bold hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.productId)}
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
            <span>
              {Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(shipping)}
            </span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total</span>
          <span>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(total)}
          </span>
        </div>
        <Button onClick={handleCheckout}>Proceed to Checkout</Button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Your Order"
        message="Are you sure you want to place this order?"
        isHaveCancelButton={true}
      />
    </div>
  );
}
