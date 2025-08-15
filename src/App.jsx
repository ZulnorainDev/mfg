import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import EditPage from "./pages/EditPage";
import Faq from "./pages/Faq";
import About from "./pages/About";
import MedicalInfo from "./pages/MedicalInfo";
import Page from "./pages/about/page";
import About_newData from "./pages/about/About_newdata";
import Protected from "./auth/Protected";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/edit_doctor" element={<EditPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/medical_info" element={<MedicalInfo />} />
        <Route path="/doc_details" element={<DoctorDetails />} />
        <Route path="/about_info1" element={<Page />} />
        <Route path="/about_new" element={<About_newData />} />
      </Routes>
    </>
  );
};

export default App;
