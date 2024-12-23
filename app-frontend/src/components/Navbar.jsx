import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    return (
        <nav id="navbar">
            <div className="navbar-wrapper container">
                <Link to="/" className="navbar-brand">Efe'Store</Link>
                <button id="btn-hamburger" onClick={() => setIsMenuActive(!isMenuActive)}>
                    <span className="material-symbols-outlined"> menu </span>
                </button>

                <ul className={`navbar-menu ${isMenuActive ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/products" className="navbar-link">Products</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/cart" className="navbar-link">Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;