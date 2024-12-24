import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    return (
        <nav id="navbar">
            <div className="navbar-wrapper mx-auto md:container">
                <Link to="/" className="navbar-brand">Efe'Store</Link>
                <button id="btn-hamburger" onClick={() => setIsMenuActive(!isMenuActive)}>
                    <span className="material-symbols-outlined"> menu </span>
                </button>

                <ul className={`navbar-menu ${isMenuActive ? 'active' : ''} flex-1`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/products" className="navbar-link">Products</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/cart" className="navbar-link">Cart</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/profile" className="navbar-link">Profile</Link>
                    </li>
                    <li className="navbar-item md:ml-auto">
                        <button onClick={handleLogout} className="navbar-link">Log Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;