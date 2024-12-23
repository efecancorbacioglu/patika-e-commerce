import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('email', email)
        console.log('pass', password)       
       
         if (!email || !password) {
            alert('hata')
            setError("Email and password cannot be empty.");
            return;
        }

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            const { token } = response.data;

            localStorage.setItem("token", token);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <Button type="submit">Login</Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't you have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
