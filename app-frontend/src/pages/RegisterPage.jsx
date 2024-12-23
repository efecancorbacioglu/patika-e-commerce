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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !surname || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", {
                name,
                surname,
                email,
                password,
            });

            const { user } = response.data;

            if (user) {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <Input
                            label="Name"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                        />
                    </div>
                    {/* Surname */}
                    <div>
                        <Input
                            label="Surname"
                            id="surname"
                            type="text"
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => {
                                setSurname(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                        />
                    </div>
                    {/* Email */}
                    <div className="md:col-span-2">
                        <Input
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                        />
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <Input
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                        />
                    </div>
                    {/* Error Message */}
                    {error && (
                        <p className="md:col-span-2 text-red-500 text-sm text-center">{error}</p>
                    )}
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <Button type="submit">Register</Button>
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
