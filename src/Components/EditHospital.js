import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://hospital-management-backend-p2rk.onrender.com/api/v1/hospitals/details/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hospital details");
        }

        const result = await response.json();
        if (result.success && result.hospital) {
          setFormData(result.hospital);
        } else {
          setError("Hospital details not found.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecialitiesChange = (e) => {
    setFormData({
      ...formData,
      specialities: Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://hospital-management-backend-p2rk.onrender.com/api/v1/hospitals/update?id=${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Hospital updated successfully!");
        setTimeout(() => navigate(`/hospitalDetails/${id}`), 2000);
      } else {
        setError(result.message || "Failed to update hospital.");
      }
    } catch (err) {
      setError("Error updating hospital: " + err.message);
    }
  };

  if (loading) return <p>Loading hospital details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="form-container">
      <h2>Edit Hospital</h2>

      {successMessage && <p className="success-text">{successMessage}</p>}
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="hospital-form">
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <select
          multiple
          name="specialities"
          value={formData.specialities}
          onChange={handleSpecialitiesChange}
        >
          <option value="Heart">Heart</option>
          <option value="Ear">Ear</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="numberOfDoctors"
          placeholder="Number of Doctors"
          value={formData.numberOfDoctors}
          onChange={handleChange}
        />
        <input
          type="number"
          name="numberOfDepartments"
          placeholder="Number of Departments"
          value={formData.numberOfDepartments}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Update Hospital
        </button>
      </form>
    </div>
  );
};

export default EditHospital;
