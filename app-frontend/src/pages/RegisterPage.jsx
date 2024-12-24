import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !surname || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/auth/register", {
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                password,
            });

            const token = response.data?.response?.token;
            const user = response.data?.response?.user;
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            } else {
                setError("Token could not be retrieved.");
            }
            
        } catch (err) {
            setError(
                err.response?.data?.response?.message || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <Input
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* Surname */}
                    <Input
                        label="Surname"
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    {/* Email */}
                    <div className="md:col-span-2">
                        <Input
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="md:col-span-2"
                        />
                    </div>
                    {/* Password */}
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Confirm Password */}
                    <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {/* Error Message */}
                    {error && (
                        <p className="md:col-span-2 text-red-500 text-sm text-center">{error}</p>
                    )}
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <Button type="submit" disabled={loading} className="md:col-span-2">
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
