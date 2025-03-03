import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HospitalForm from "./Components/HospitalForm";
import HospitalList from "./Components/HospitalList";
import HospitalDetails from "./Components/HospitalDetails";
import EditHospital from "./Components/EditHospital";
import DeleteHospital from "./Components/DeleteHospital";
import Signup from "./Components/Authorisation/Signup";
import Login from "./Components/Authorisation/Login";
import Navbar from "./Components/navbar";
import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HospitalList />} />
                <Route path="/add-hospital" element={<HospitalForm />} />
                <Route path="/hospitalDetails/:id" element={<HospitalDetails />} />
                <Route path="/editDetails/:id" element={<EditHospital />} />
                <Route path="/deleteHospital/:id" element={<DeleteHospital />} />
                <Route path="/signup" element={<Signup />} />  {/* Fixed Here */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;