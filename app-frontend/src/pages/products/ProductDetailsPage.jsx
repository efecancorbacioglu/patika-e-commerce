import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Button from "../../components/ui/Button"
function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(null);
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/product/${id}`);
            console.log('data:', response)
            if (response.data && response.data.data) {
                setProduct(response.data.data);
            } else {
                setError("Product not found.");
            }
        } catch (err) {
            setError("An error occurred while fetching the product.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            const response = await axios.post("/api/basket/add", {
                productId: id,
                quantity: 1,
            });

            if (response.status === 200) {
                setMessage("Product added");
                setTimeout(() => setMessage(null), 2000);
            }
        } catch (error) {
            alert("Product can't added to cart");
            setTimeout(() => setMessage(null), 2000);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white p-6 max-w-5xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b pb-6">
                {/* Ürün Görseli */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-md"
                    />
                </div>
                {/* Ürün Detayları */}
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-lg text-gray-700 mb-6">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-4">
                            {Intl.NumberFormat("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                            }).format(product.price)}
                        </p>
                    </div>
                    <Button disabled={message} onClick={handleAddToCart}>
                        {message ? message : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
