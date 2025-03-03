import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://hospital-management-backend-p2rk.onrender.com/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                alert("Signup failed: " + result.message);
            }
        } catch (error) {
            alert("Signup request failed.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="signup-btn">Create Account</button>
            </form>
        </div>
    );
};

export default Signup;
