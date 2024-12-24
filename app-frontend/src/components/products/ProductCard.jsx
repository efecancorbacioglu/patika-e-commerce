import Button from "../ui/Button"; 
export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-bold">{product.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                </div>
                <p className="text-primary font-bold text-xl">${product.price}</p>
            </div>
            <div className="p-4 border-t">
                <Button onClick={() => onAddToCart(product)}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}