import React, { useState } from "react";
import "./HospitalForm.css"; // You'll need to create this CSS file

const HospitalForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        image: "",
        specialities: [],
        rating: "",
        description: "",
        images: [],
        numberOfDoctors: "",
        numberOfDepartments: "",
    });
    
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSpecialitiesChange = (e) => {
        setFormData({
            ...formData,
            specialities: Array.from(e.target.selectedOptions, (option) => option.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFeedback({ message: "", type: "" });

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setFeedback({ message: "Unauthorized! Please log in.", type: "error" });
                setLoading(false);
                return;
            }

            const response = await fetch(
                "https://hospital-management-backend-p2rk.onrender.com/api/v1/hospitals/create",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();
            if (result.success) {
                setFeedback({ message: "Hospital successfully added!", type: "success" });
                setFormData({
                    name: "",
                    city: "",
                    image: "",
                    specialities: [],
                    rating: "",
                    description: "",
                    images: [],
                    numberOfDoctors: "",
                    numberOfDepartments: "",
                });
            } else {
                setFeedback({ message: `Error: ${result.message}`, type: "error" });
            }
        } catch (error) {
            setFeedback({ message: `Request failed: ${error.message}`, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hospital-form-container">
            <div className="form-header">
                <h2>Add New Hospital</h2>
                <p>Complete the form below to add a new hospital to the system</p>
            </div>

            {feedback.message && (
                <div className={`feedback-message ${feedback.type}`}>
                    {feedback.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="hospital-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Hospital Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                id="city" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="image">Main Image URL</label>
                            <input 
                                type="text" 
                                id="image" 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating (1-5)</label>
                            <input 
                                type="number" 
                                id="rating" 
                                name="rating" 
                                min="1" 
                                max="5" 
                                step="0.1" 
                                value={formData.rating} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Hospital Details</h3>
                    <div className="form-group full-width">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="4" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="Provide a detailed description of the hospital..."
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="numberOfDoctors">Number of Doctors</label>
                            <input 
                                type="number" 
                                id="numberOfDoctors" 
                                name="numberOfDoctors" 
                                min="1" 
                                value={formData.numberOfDoctors} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfDepartments">Number of Departments</label>
                            <input 
                                type="number" 
                                id="numberOfDepartments" 
                                name="numberOfDepartments" 
                                min="1" 
                                value={formData.numberOfDepartments} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Specialities</h3>
                    <div className="form-group specialities-container">
                        <label htmlFor="specialities">Select Specialities (hold Ctrl/Cmd to select multiple)</label>
                        <div className="speciality-select-wrapper">
                            <select 
                                multiple 
                                id="specialities" 
                                name="specialities" 
                                value={formData.specialities} 
                                onChange={handleSpecialitiesChange}
                                size="5"
                            >
                                <option value="Heart">Heart</option>
                                <option value="Ear">Ear</option>
                                <option value="Orthopedic">Orthopedic</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                            </select>
                        </div>
                        <div className="selected-specialities">
                            {formData.specialities.length > 0 && (
                                <>
                                    <label>Selected Specialities:</label>
                                    <div className="speciality-tags">
                                        {formData.specialities.map((spec) => (
                                            <span key={spec} className="speciality-tag">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="reset-btn"
                        onClick={() => {
                            setFormData({
                                name: "",
                                city: "",
                                image: "",
                                specialities: [],
                                rating: "",
                                description: "",
                                images: [],
                                numberOfDoctors: "",
                                numberOfDepartments: "",
                            });
                            setFeedback({ message: "", type: "" });
                        }}
                    >
                        Reset Form
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Adding Hospital..." : "Add Hospital"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HospitalForm;