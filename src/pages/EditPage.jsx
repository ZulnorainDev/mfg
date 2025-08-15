import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../hooks/UseAppData";

export default function EditPage() {
  const { fetcdochdata } = useAppData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    about_doctor: "",
    doc_bio: {
      awards: "",
      description: "",
      education: "",
      experience: "",
      name: "",
      specialty: "",
    },
    doctor_contact_info: {
      address: "",
      email: "",
      hours: "",
      location: "",
      phone: "",
      website: "",
    },
    img: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url =
        "https://mfgprodbot.hellommj.com/api/insert_update_single_doctors/";

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "API returned an error");

      setMessage("Saved successfully.");
      fetcdochdata();
      navigate("/doctors");
    } catch (err) {
      console.error("Save error:", err);
      setMessage(err.message || "Failed to save. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-[var(--1)]/20">
      <div className="px-6 pt-4 sticky top-0 bg-gray-50">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 px-12 pb-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer py-1.5 pl-4 pr-6 rounded-md bg-gray-50 border border-gray-300 flex items-center gap-2 text-gray-700 font-medium"
          >
            <FiArrowLeft className="text-sm" />
            Back
          </button>
          <h1 className="ml-4 text-2xl font-bold">Add / Edit Doctor</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mx-auto border border-[var(--1)]"
        >
          {/* About Doctor */}
          <h2 className="text-lg font-semibold mb-4">About Doctor</h2>
          <textarea
            name="about_doctor"
            value={formData.about_doctor}
            onChange={(e) => handleChange(e, null, "about_doctor")}
            placeholder="Short introduction about the doctor"
            rows="3"
            className="w-full border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
          ></textarea>

          {/* Doc Bio Section */}
          <h2 className="text-lg font-semibold mt-6 mb-4">Doctor Bio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.doc_bio.name}
              onChange={(e) => handleChange(e, "doc_bio", "name")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
            <input
              type="text"
              placeholder="Specialty"
              value={formData.doc_bio.specialty}
              onChange={(e) => handleChange(e, "doc_bio", "specialty")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Experience (e.g. 10 years)"
              value={formData.doc_bio.experience}
              onChange={(e) => handleChange(e, "doc_bio", "experience")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
            <input
              type="text"
              placeholder="Education"
              value={formData.doc_bio.education}
              onChange={(e) => handleChange(e, "doc_bio", "education")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Awards"
              value={formData.doc_bio.awards}
              onChange={(e) => handleChange(e, "doc_bio", "awards")}
              className="w-full border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Detailed description"
              rows="3"
              value={formData.doc_bio.description}
              onChange={(e) => handleChange(e, "doc_bio", "description")}
              className="w-full border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            ></textarea>
          </div>

          {/* Contact Info Section */}
          <h2 className="text-lg font-semibold mt-6 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={formData.doctor_contact_info.location}
              onChange={(e) =>
                handleChange(e, "doctor_contact_info", "location")
              }
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.doctor_contact_info.address}
              onChange={(e) =>
                handleChange(e, "doctor_contact_info", "address")
              }
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="tel"
              placeholder="Phone"
              value={formData.doctor_contact_info.phone}
              onChange={(e) => handleChange(e, "doctor_contact_info", "phone")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.doctor_contact_info.email}
              onChange={(e) => handleChange(e, "doctor_contact_info", "email")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Working Hours"
              value={formData.doctor_contact_info.hours}
              onChange={(e) => handleChange(e, "doctor_contact_info", "hours")}
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
            <input
              type="text"
              placeholder="Website"
              value={formData.doctor_contact_info.website}
              onChange={(e) =>
                handleChange(e, "doctor_contact_info", "website")
              }
              className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-[var(--1)] hover:bg-[var(--11)] text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            {message && <div className="text-sm text-gray-700">{message}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
