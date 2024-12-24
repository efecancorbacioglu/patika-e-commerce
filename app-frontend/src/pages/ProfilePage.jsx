import { useState } from "react";
import axios from "../utils/axios";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function EditProfile() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [userInformations, setUserInformations] = useState({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
    });
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUserInformationSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            setError("");
        }

        if (!userInformations.name || !userInformations.surname || !userInformations.email) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put("/api/user/" + user.id, {
                name: userInformations.name,
                surname: userInformations.surname,
                email: userInformations.email,
            });

            if (response.data && response.data.response) {
                setError("");

                // LocalStorage'daki user bilgisini güncelle
                const updatedUser = {
                    ...user,
                    name: userInformations.name,
                    surname: userInformations.surname,
                    email: userInformations.email,
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));

                alert("User information updated successfully!");
            } else {
                setError("Failed to update user information.");
            }
        } catch (err) {
            setError("An error occurred while updating user information.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordError) {
            setPasswordError("");
        }
        if (!newPassword || !newPasswordConfirm) {
            setPasswordError("Both password fields are required.");
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put("/api/user/" + user.id, {
                password: newPassword,
            });

            if (response.data && response.data.response) {
                setPasswordError("");
                setNewPassword("");
                setNewPasswordConfirm("");

                alert("Password updated successfully!");
            } else {
                setPasswordError("Failed to update password.");
            }
        } catch (err) {
            setPasswordError("An error occurred while updating password.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Hata mesajını sıfırla
        if (error) {
            setError("");
        }

        // Kullanıcı bilgilerini güncelle
        setUserInformations((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e, setState) => {
        if (passwordError) {
            setPasswordError("");
        }
        setState(e.target.value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-xl border">
                <h1 className="text-2xl font-bold text-center mb-4">Edit Profile</h1>
                {/* Kullanıcı Bilgilerini Güncelleme Formu */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={handleUserInformationSubmit}
                >
                    {/* Name */}
                    <div>
                        <Input
                            name="name"
                            label="Name"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={userInformations.name}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Surname */}
                    <div>
                        <Input
                            name="surname"
                            label="Surname"
                            id="surname"
                            type="text"
                            placeholder="Surname"
                            value={userInformations.surname}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Email */}
                    <div className="md:col-span-2">
                        <Input
                            name="email"
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={userInformations.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Error Message */}
                    {error && (
                        <p className="md:col-span-2 text-red-500 text-sm text-center">{error}</p>
                    )}
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <Button type="submit" disabled={loading} className="md:col-span-2">
                            {loading ? "Saving..." : "Save Information"}
                        </Button>
                    </div>
                </form>
                <hr className="my-4" />
                {/* Şifre Güncelleme Formu */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={handlePasswordSubmit}
                >
                    <div>
                        <Input
                            name="newPassword"
                            label="New Password"
                            id="newPassword"
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => handlePasswordChange(e, setNewPassword)}
                        />
                    </div>
                    <div>
                        <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={newPasswordConfirm}
                            onChange={(e) => handlePasswordChange(e, setNewPasswordConfirm)}
                        />
                    </div>
                    {/* Error Message */}
                    {passwordError && (
                        <p className="md:col-span-2 text-red-500 text-sm text-center">
                            {passwordError}
                        </p>
                    )}
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <Button type="submit" disabled={loading} className="md:col-span-2">
                            {loading ? "Saving..." : "Change Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
