import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import ProductList from "../../components/products/ProductList";


function Products() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/product");
            setProducts(response.data.response);
            setLoading(false);
        } catch (err) {
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

    const filteredProducts = products.filter((product) => {
        const price = product.price;
        if (priceFilter === "low") return price < 1000; 
        if (priceFilter === "mid") return price >= 1000 && price <= 5000; 
        if (priceFilter === "high") return price > 10000;
        return true; 
    });

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
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                >
                    <option value="">All Prices</option>
                    <option value="low">Under ₺1.000</option>
                    <option value="mid">$1.000 - $5.000</option>
                    <option value="high">$10.000</option>
                </select>
            </div>

            {/* Ürün Listesi */}
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
        </div>
    );
}

export default Products;
