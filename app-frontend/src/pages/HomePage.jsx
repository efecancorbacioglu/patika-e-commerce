import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <section className="bg-gray-100">
        <div className="relative">
          <div className="overflow-hidden relative h-[500px] rounded-lg shadow-lg">
              <div
                className="w-full h-full flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&w=1920&h=500&fit=crop')",
                }}
              >
                <div className="bg-black bg-opacity-50 p-8 rounded-md text-center">
                  <h2 className="text-5xl font-bold mb-4 text-white">
                    New Arrivals
                  </h2>
                  <p className="text-lg mb-6 text-gray-300">
                    Explore the latest collections of gadgets and accessories!
                  </p>
                  <Link to="/products" className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-500">
                    Discover More
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Shop with Us?</h2>
          <p className="text-lg text-gray-700 mb-6">
            At ShopHub, we provide premium quality products at unbeatable
            prices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-blue-700">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Enjoy lightning-fast delivery across the country.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-green-700">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Your transactions are encrypted and completely secure.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-yellow-700">
                Exclusive Deals
              </h3>
              <p className="text-gray-600">
                Get access to members-only discounts and promotions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
