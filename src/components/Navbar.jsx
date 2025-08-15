import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppData } from "../hooks/UseAppData";

const Navbar = () => {
  const navigate = useNavigate();

  const { navvalue, setnavvalue, fetcdochdata, fetcfaqhdata, fetchmedidata } =
    useAppData();

  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b-1 border-gray-200">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="flex  items-center gap-3">
          <FaStethoscope className="text-[var(--1)] text-xl" />
          <div className="text-[var(--2)] text-2xl font-bold">
            {" "}
            MY FLORIDA <span className="text-[var(--1)]">GREEN</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link
          onClick={() => {
            setnavvalue("home");
          }}
          to="/"
          className={`${
            navvalue === "home" ? "text-black bg-[var(--1)]/50" : ""
          } px-3 py-1 rounded hover:text-[var(--1)]`}
        >
          Home
        </Link>
        <Link
          onClick={() => {
            setnavvalue("doctor");
            fetcdochdata();
          }}
          to="/doctors"
          className={`${
            navvalue === "doctor" ? "text-black bg-[var(--1)]/50" : ""
          } px-3 py-1 rounded hover:text-[var(--1)]`}
        >
          Doctors
        </Link>
        <Link
          onClick={() => {
            setnavvalue("faq");
            fetcfaqhdata();
          }}
          to="/faq"
          className={`${
            navvalue === "faq" ? "text-black bg-[var(--1)]/50" : ""
          } px-3 py-1 rounded hover:text-[var(--1)]`}
        >
          FAQ
        </Link>
        <Link
          onClick={() => {
            setnavvalue("about");
          }}
          to="/about"
          className={`${
            navvalue === "about" ? "text-black bg-[var(--1)]/50" : ""
          } px-3 py-1 rounded hover:text-[var(--1)]`}
        >
          About
        </Link>
        <Link
          onClick={() => {
            setnavvalue("medical");
            fetchmedidata();
          }}
          to="/medical_info"
          className={`${
            navvalue === "medical" ? "text-black bg-[var(--1)]/50" : ""
          } px-3 py-1 rounded hover:text-[var(--1)]`}
        >
          Medical Info
        </Link>
      </div>
      <button
        onClick={() => {
          navigate("/login");
        }}
        className="border px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
