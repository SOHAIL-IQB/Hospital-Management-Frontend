import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const HospitalDetails = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://hospital-management-backend-p2rk.onrender.com/api/v1/hospitals/details/${id}`
                );
                const result = await response.json();
                if (result.success && result.hospital) {
                    setHospital(result.hospital);
                } else {
                    setError("Hospital details not found.");
                }
            } catch (err) {
                setError("Failed to fetch hospital details.");
            } finally {
                setLoading(false);
            }
        };

        fetchHospitalDetails();
    }, [id]);

    if (loading) return <p>Loading hospital details...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="hospital-details">
            <h2>{hospital.name}</h2>
            <img src={hospital.image} alt={hospital.name} className="hospital-image" />
            <p><strong>City:</strong> {hospital.city}</p>
            <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>
            <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>

            {hospital.description && <p><strong>Description:</strong> {hospital.description}</p>}
            {hospital.images && hospital.images.length > 0 && (
                <div>
                    <h3>Gallery</h3>
                    {hospital.images.map((img, index) => (
                        <img key={index} src={img} alt={`Hospital ${index}`} className="hospital-thumbnail" />
                    ))}
                </div>
            )}

            <div className="buttons">
                <Link to={`/editDetails/${id}`} className="edit-btn">Edit Details</Link>
                <Link to={`/deleteHospital/${id}`} className="delete-btn">Delete</Link>
            </div>
        </div>
    );
};

export default HospitalDetails;
