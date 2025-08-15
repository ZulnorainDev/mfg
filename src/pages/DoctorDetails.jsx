import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMail, FiPhone, FiArrowLeft } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";

export default function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetcdochdata } = useAppData();

  const defaultDoctor = {
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
  };

  const [formData, setFormData] = useState(defaultDoctor);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch doctor from API when id changes
  useEffect(() => {
    if (!id) return;
    fetch(`https://mfgprodbot.hellommj.com/api/get_doctor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        console.log("fetched doctor data:", data);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
      });
  }, [id]);

  function openEdit() {
    setIsEditOpen(true);
  }

  function closeEdit() {
    setIsEditOpen(false);
  }

  function handleChange(e, section = null, field) {
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
  }

  // Submit handler - sends edited data to server
  async function handleSubmit(e) {
    e.preventDefault();

    if (!id) {
      console.error("No doctor id provided in route params.");
      return;
    }

    try {
      setLoading(true);

      const url = `https://mfgprodbot.hellommj.com/api/insert_update_single_doctors/?doctor_id=${id}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("API error:", response.status, result);
        alert(
          "Failed to save changes. Server responded with status " +
            response.status
        );
      } else {
        if (result) {
          setFormData(result);
        }
        setIsEditOpen(false);
        alert("Doctor saved successfully.");
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
      alert("An unexpected error occurred while saving. Check console.");
    } finally {
      setLoading(false);
    }
  }

  // DELETE handler for doctor
  async function handleDelete() {
    if (!id) {
      alert("No doctor id available to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      // Use the delete endpoint provided (replace method if your API expects a different verb)
      const deleteUrl = `https://mfgprodbot.hellommj.com/api/delete_doctor/${id}`;

      const response = await fetch(deleteUrl, {
        method: "DELETE", // try DELETE first - if API expects GET/POST change accordingly
        headers: {
          "Content-Type": "application/json",
          // add Authorization header here if your API requires auth, e.g.
          // "Authorization": `Bearer ${token}`
        },
      }).catch(async (err) => {
        // Some servers may not accept DELETE; try GET as fallback
        console.warn("DELETE request failed, trying GET fallback:", err);
        return fetch(deleteUrl, { method: "GET" });
      });

      // If response is undefined (both requests failed) handle it
      if (!response) {
        throw new Error("No response from server while attempting to delete.");
      }

      // Attempt to parse JSON safely
      let result = null;
      try {
        result = await response.json();
      } catch (_) {
        // server might return empty body or plain text — that's okay
        result = null;
      }

      if (!response.ok) {
        console.error("Delete API error:", response.status, result);
        alert(
          "Failed to delete doctor. Server responded with status " +
            response.status
        );
      } else {
        // Success - navigate back to list (or wherever you prefer)
        alert("Doctor deleted successfully.");
        fetcdochdata();
        navigate(-1); // go back to previous page
      }
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("An unexpected error occurred while deleting. Check console.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[var(--1)]/20">
      <div className="px-6 py-4">
        <Navbar />
      </div>

      <div className="px-8 mt-6">
        <button
          onClick={() => {
            navigate(-1);
            fetcdochdata();
          }}
          className="cursor-pointer py-1.5 pl-4 pr-6 rounded-md bg-gray-50 border-[1px] border-gray-300 flex items-center gap-2 text-gray-700 font-medium"
        >
          <FiArrowLeft className="text-sm" />
          Back
        </button>

        <div className="mt-4 bg-white rounded-xl shadow-sm border border-green-100 p-6 flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold">{formData.doc_bio?.name}</h1>
            <p className="text-[var(--4)]">{formData.doc_bio?.specialty}</p>
            <p className="mt-2">{formData.about_doctor}</p>
            <p className="mt-2">{formData.doc_bio?.description}</p>

            <div className="mt-2 text-sm text-gray-600">
              <p>
                <strong>Education:</strong> {formData.doc_bio?.education}
              </p>
              <p>
                <strong>Experience:</strong> {formData.doc_bio?.experience}
              </p>
              <p>
                <strong>Awards:</strong> {formData.doc_bio?.awards}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {formData.doctor_contact_info?.address}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {formData.doctor_contact_info?.location}
              </p>
              <p>
                <strong>Hours:</strong> {formData.doctor_contact_info?.hours}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiMail className="text-green-600" />{" "}
                {formData.doctor_contact_info?.email}
              </span>
              <span className="flex items-center gap-1">
                <FiPhone className="text-green-600" />{" "}
                {formData.doctor_contact_info?.phone}
              </span>
              <span className="flex items-center gap-1">
                <CiGlobe className="text-green-600" />{" "}
                {formData.doctor_contact_info?.website}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={openEdit}
                className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`cursor-pointer px-4 py-2 rounded-lg text-white ${
                  deleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit popup */}
      {isEditOpen && (
        <aside className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-4">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={closeEdit}
            aria-hidden="true"
          />

          {/* Scrollable centered popup */}
          <div className="relative bg-white w-full md:max-w-2xl lg:max-w-3xl max-h-[90vh] rounded-md shadow-lg overflow-y-auto scroll-py-6  p-6 z-50 custom-scrollbar">
            <h2 className="text-lg font-semibold mb-4">Edit Doctor</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* About Doctor */}
              <div>
                <h3 className="text-md font-semibold mb-2">About Doctor</h3>
                <textarea
                  name="about_doctor"
                  value={formData.about_doctor}
                  onChange={(e) => handleChange(e, null, "about_doctor")}
                  rows={3}
                  className="w-full border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
                />
              </div>

              {/* Doctor Bio */}
              <div>
                <h3 className="text-md font-semibold mb-2">Doctor Bio</h3>
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
                    placeholder="Experience"
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
                <input
                  type="text"
                  placeholder="Awards"
                  value={formData.doc_bio.awards}
                  onChange={(e) => handleChange(e, "doc_bio", "awards")}
                  className="w-full border rounded-lg p-2 mt-4 border-gray-300 focus:border-[var(--1)] outline-none"
                />
                <textarea
                  placeholder="Detailed description"
                  rows={3}
                  value={formData.doc_bio.description}
                  onChange={(e) => handleChange(e, "doc_bio", "description")}
                  className="w-full border rounded-lg p-2 mt-4 border-gray-300 focus:border-[var(--1)] outline-none"
                />
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Contact Information
                </h3>
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
                    onChange={(e) =>
                      handleChange(e, "doctor_contact_info", "phone")
                    }
                    className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.doctor_contact_info.email}
                    onChange={(e) =>
                      handleChange(e, "doctor_contact_info", "email")
                    }
                    className="border rounded-lg p-2 border-gray-300 focus:border-[var(--1)] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Working Hours"
                    value={formData.doctor_contact_info.hours}
                    onChange={(e) =>
                      handleChange(e, "doctor_contact_info", "hours")
                    }
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
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer mt-6 bg-[var(--1)] hover:bg-[var(--11)] text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </aside>
      )}
    </div>
  );
}
