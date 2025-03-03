import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteHospital = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this hospital??");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized! Please log in.");
                navigate("/login");
                return;
            }

            const response = await fetch(
                `https://hospital-management-backend-p2rk.onrender.com/api/v1/hospitals/delete?id=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();
            if (result.success) {
                alert("Hospital deleted successfully!");
                navigate("/");
            } else {
                alert("Failed to delete hospital: " + result.message);
            }
        } catch (error) {
            alert("Error deleting hospital: " + error.message);
        }
    };

    return (
        <div className="delete-container">
            <h2>Delete Hospital</h2>
            <p>Are you sure you want to delete this hospital??</p>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
            <button onClick={() => navigate(-1)} className="cancel-btn">Cancel</button>
        </div>
    );
};

export default DeleteHospital;
