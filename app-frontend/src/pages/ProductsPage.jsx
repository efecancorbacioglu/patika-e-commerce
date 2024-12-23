import { useState, useEffect } from "react";
import axios from "../utils/axios";
import ProductList from "../components/products/ProductList";

const mockCategories = ["Electronics", "Wearable", "Fitness"];

function Products() {
    const [products, setProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/product");
            console.log(response.data.response);
            setProducts(response.data.response); // Backend'den dönen ürünleri set ediyoruz
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        alert(`${product.title} added to cart!`);
    };

    if (loading) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

            {/* Filtreleme Alanı */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                >
                    <option value="">All Categories</option>
                    {mockCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                >
                    <option value="">All Prices</option>
                    <option value="low">Under $50</option>
                    <option value="mid">$50 - $150</option>
                    <option value="high">Above $150</option>
                </select>
            </div>

            {/* Ürün Listesi */}
            <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
    );
}

export default Products;
