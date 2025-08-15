import React, { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2, FiPlus, FiX, FiMinus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const { companyInfo, fetchCompanydata } = useAppData();

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bulkItems, setBulkItems] = useState([]);

  useEffect(() => {
    setItems(companyInfo);
  }, [companyInfo]);

  const openModal = () => {
    setBulkItems([emptyItem(Date.now())]);
    setIsModalOpen(true);
  };

  // save bulk data

  // delete data
  // delete data
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `https://mfgprodbot.hellommj.com/api/delete_company_info/${id}/`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const [viewItem, setViewItem] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openEdit = (item) => {
    const cloned = JSON.parse(JSON.stringify(item));
    ["benefits", "methods", "key_features", "dosing_guidance"].forEach((f) => {
      if (!cloned.details[f]) cloned.details[f] = [];
    });
    setEditItem(cloned);
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditItem(null);
  };

  const editChangeRoot = (field, value) =>
    setEditItem((prev) => ({ ...prev, [field]: value }));

  const editChangeDetail = (field, value) =>
    setEditItem((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));

  const editChangeArray = (field, index, value) =>
    setEditItem((prev) => {
      const arr = [...(prev.details[field] || [])];
      arr[index] = value;
      return { ...prev, details: { ...prev.details, [field]: arr } };
    });

  const editAddArrayItem = (field) =>
    setEditItem((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: [...(prev.details[field] || []), ""],
      },
    }));

  const editRemoveArrayItem = (field, index) =>
    setEditItem((prev) => {
      const arr = [...(prev.details[field] || [])];
      arr.splice(index, 1);
      return { ...prev, details: { ...prev.details, [field]: arr } };
    });

  const saveEdit = async () => {
    if (!editItem) return;
    try {
      const response = await fetch(
        `https://mfgprodbot.hellommj.com/api/update_medical_marijuana_info/${editItem.id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editItem),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const updatedItem = await response.json();
      setItems((prev) => [
        updatedItem,
        ...prev.filter((it) => it.id !== updatedItem.id),
      ]);
      closeEdit();
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update data. Please try again.");
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setViewItem(null);
        setIsModalOpen(false);
        closeEdit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="px-8 py-6 bg-gradient-to-b from-gray-50 to-[var(--1)]/20 min-h-screen">
      <Navbar />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About And Information</h1>
        <button
          onClick={() => navigate("/about_new")}
          className="bg-[var(--1)] hover:bg-[var(--11)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add Comapny Information
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {item.about_company.overview}
              </span>
              <h2 className="text-lg font-bold mt-2">{item.subcategory}</h2>
              {item.details?.description ? (
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {item.details.description}
                </p>
              ) : (
                <p className="text-gray-400 mt-2">No description available</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <FiEye
                onClick={() => navigate("/about_info1", { state: { item } })}
                className="cursor-pointer"
              />
              <FiTrash2
                onClick={() => handleDelete(item.id)}
                className="cursor-pointer text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
