import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";

export default function Doctors() {
  const navigate = useNavigate();

  const { doctors } = useAppData();

  // Prepare a copy of doctors sorted newest-first.
  // If your doctor objects contain a created_at or createdAt timestamp, we'll sort by it.
  // Otherwise we reverse the array assuming newer items are appended to the end.
  const sortedDoctors = React.useMemo(() => {
    if (!Array.isArray(doctors)) return [];

    // Try to detect timestamp field
    const sample = doctors[0] || {};
    const tsField =
      "created_at" in sample
        ? "created_at"
        : "createdAt" in sample
        ? "createdAt"
        : null;

    if (tsField) {
      // Sort by date desc (newest first)
      return [...doctors].sort((a, b) => {
        const da = new Date(a[tsField] || 0).getTime();
        const db = new Date(b[tsField] || 0).getTime();
        return db - da;
      });
    }

    // Fallback: reverse copy (assumes newest items are at the end)
    return [...doctors].reverse();
  }, [doctors]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[var(--1)]/20">
      <div className="px-8 py-4">
        <Navbar />
      </div>

      <div className="px-8 mt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaUserMd className="text-[var(--1)] text-2xl" />
            <h1 className="text-3xl font-bold">Doctors</h1>
          </div>

          <div className="flex items-center gap-4 mt-0">
            {/* <div className="flex items-center border rounded-lg px-3 py-2 w-80 bg-white shadow-sm">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="outline-none w-full"
              />
            </div> */}
            <button
              onClick={() => {
                navigate("/edit_doctor");
              }}
              className="cursor-pointer bg-[var(--1)] hover:bg-[var(--11)] text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2"
            >
              + Add Doctor
            </button>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {sortedDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/doctors/${doc.id}`)}
              className="cursor-pointer bg-white rounded-xl shadow-sm p-6 flex flex-col items-start border border-green-100 hover:shadow-md transition"
            >
              <h2 className="font-bold">{doc.doc_bio?.name}</h2>
              <p className="text-[var(--4)] text-sm mb-2">
                {doc.doc_bio?.specialty}
              </p>
              <p className="text-gray-500 text-sm">{doc.doc_bio?.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
