import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://hospital-management-backend-p2rk.onrender.com/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem("token", result.token);
               
                window.dispatchEvent(new Event("storage"));
                alert("Login successful!");
                navigate("/", { replace: true }); 
            } else {
                alert("Login failed: " + result.message);
            }
        } catch (error) {
            alert("Login request failed. Check console for details.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
