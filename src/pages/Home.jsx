import React from "react";
import { FaUserMd } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPills } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";

const Home = () => {
  const navigate = useNavigate();
  const {
    setnavvalue,
    fetcdochdata,
    fetcfaqhdata,
    fetchmedidata,
    fetchCompanydata,
  } = useAppData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[var(--1)]/20 px-8 py-4">
      {/* Navbar */}
      {/* <div className="flex justify-between items-center mb-6 pb-4 border-b-1 border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex  items-center gap-3">
            <FaStethoscope className="text-teal-600 text-xl" />
            <div className="text-teal-600 text-2xl font-bold"> MediCare</div>
          </div>
        </div>
        <div className="flex gap-6 text-gray-700 font-medium">
          <a href="#" className="text-teal-600 bg-green-100 px-3 py-1 rounded">
            Home
          </a>
          <a href="#">Doctors</a>
          <a href="#">FAQ</a>
          <a href="#">Appointments</a>
          <a href="#">Pharmacy</a>
        </div>
        <button className="border px-4 py-2 rounded-md flex items-center gap-2">
          Logout
        </button>
      </div> */}
      <Navbar />

      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
        <FiLayers className="text-[var(--1)]" />
        Welcome to <span className="text-[var(--1)]">MFG</span> Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Doctors */}
        <div
          onClick={() => {
            navigate("/doctors");
            setnavvalue("doctor");
            fetcdochdata();
          }}
          className="cursor-pointer bg-white rounded-lg shadow px-5 py-8 border-[1px] border-teal-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-[var(--1)] to-[var(--5)] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 w-full">
              <FaUserMd /> Doctor’s information
            </span>
          </div>
          <h2 className="text-xl font-semibold">Doctor’s information </h2>
          <p className="text-gray-600 text-sm pt-6">
            Browse, add, and manage doctors
          </p>
        </div>

        {/* FAQ */}
        <div
          onClick={() => {
            navigate("/faq");
            setnavvalue("faq");
            fetcfaqhdata();
          }}
          className="cursor-pointer bg-white rounded-lg shadow px-5 py-8 border-[1px] border-teal-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-[var(--1)] to-[var(--5)] w-full text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <FaQuestionCircle /> FAQ information
            </span>
          </div>
          <h2 className="text-xl font-semibold">FAQ information </h2>
          <p className="text-gray-600 text-sm pt-8">
            Find answers or add new FAQs
          </p>
        </div>

        {/* About and company information */}
        <div
          onClick={() => {
            navigate("/about");
            setnavvalue("about");
            fetchCompanydata();
          }}
          className="bg-white rounded-lg shadow px-5 py-8 border-[1px] border-teal-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-[var(--1)] to-[var(--5)] w-full text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <FaCalendarAlt /> About and company information
            </span>
          </div>
          <h2 className="text-xl font-semibold">
            About and company information
          </h2>
          <p className="text-gray-600 text-sm pt-8">
            Find Informain About Company
          </p>
        </div>

        {/* Medical Information */}
        <div
          onClick={() => {
            navigate("/medical_info");
            setnavvalue("medical");
            fetchmedidata();
          }}
          className="cursor-pointer bg-white rounded-lg shadow px-5 py-8 border-[1px] border-teal-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-[var(--1)] to-[var(--5)] w-full text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <FaPills /> Medical information
            </span>
          </div>
          <h2 className="text-xl font-semibold">Medical information </h2>
          <p className="text-gray-600 text-sm pt-8">Find Medical information</p>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-600 text-sm mb-3">Quick links</h3>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded-md text-sm">
              View Doctors
            </button>
            <button className="bg-[var(--1)] text-white px-3 py-1 rounded-md text-sm">
              Add Doctor
            </button>
            <button className="border px-3 py-1 rounded-md text-sm">
              FAQs
            </button>
          </div>
        </div>

        {/* Today */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-600 text-sm mb-3">Today</h3>
          <ul className="text-sm text-gray-800 space-y-1">
            <li>• 3 new faq added</li>
            <li>• 1 new medical infomation added</li>
            <li>• 1 Doctor information updated</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-600 text-sm mb-3">Tips</h3>
          <p className="text-sm text-gray-800">
            Keep patient data secure. Use strong passwords and review access
            logs regularly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
