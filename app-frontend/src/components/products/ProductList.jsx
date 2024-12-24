import ProductCard from "./ProductCard";

export default function ProductList({ products, onAddToCart }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
            {products.length === 0 && (
                <p className="text-center text-gray-500 mt-8 col-span-full">
                    No products found.
                </p>
            )}
        </div>
    );
}
