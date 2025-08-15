import React, { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2, FiPlus, FiX, FiMinus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";

export default function MedicalInfo() {
  const { medicalInfo, fetchmedidata } = useAppData();

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bulkItems, setBulkItems] = useState([]);

  const emptyItem = (id) => ({
    id,
    category: "",
    subcategory: "",
    details: {
      description: "",
      benefits: [""],
      target_audience: "",
      scientific_support: "",
      methods: [""],
      onset: "",
      duration: "",
      key_features: [""],
      dosing_guidance: [""],
      best_use: "",
    },
  });

  useEffect(() => {
    setItems(medicalInfo);
  }, [medicalInfo]);

  const openModal = () => {
    setBulkItems([emptyItem(Date.now())]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBulkItems([]);
  };

  const handleChange = (itemIndex, field, value) => {
    const updated = [...bulkItems];
    updated[itemIndex][field] = value;
    setBulkItems(updated);
  };

  const handleChangeDetails = (itemIndex, field, value) => {
    const updated = [...bulkItems];
    updated[itemIndex].details[field] = value;
    setBulkItems(updated);
  };

  const handleChangeArray = (itemIndex, field, index, value) => {
    const updated = [...bulkItems];
    updated[itemIndex].details[field][index] = value;
    setBulkItems(updated);
  };

  const handleAddField = (itemIndex, field) => {
    const updated = [...bulkItems];
    updated[itemIndex].details[field].push("");
    setBulkItems(updated);
  };

  const handleAddItem = () =>
    setBulkItems([...bulkItems, emptyItem(Date.now())]);

  // save bulk data
  const handleSave = async () => {
    try {
      const payload = { items: bulkItems };
      const response = await fetch(
        "https://mfgprodbot.hellommj.com/api/medical_marijuana_info_bulk/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      fetchmedidata();

      // const savedData = await response.json();
      // setItems((prev) => [...savedData.items, ...prev]);
      closeModal();
      alert("Items saved successfully!");
    } catch (error) {
      console.error("Failed to save items:", error);
      alert("Failed to save items. Please try again.");
    }
  };

  // delete data
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `https://mfgprodbot.hellommj.com/api/delete_medical_marijuana_info/${id}/`,
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
    <div className="p-6 bg-gradient-to-b from-gray-50 to-[var(--1)]/20 min-h-screen">
      <Navbar />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medical Information</h1>
        <button
          onClick={openModal}
          className="cursor-pointer bg-[var(--1)] hover:bg-[var(--11)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add New Item
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
                {item.category}
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
                onClick={() => setViewItem(item)}
                className="cursor-pointer"
              />
              <FiEdit
                onClick={() => openEdit(item)}
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

      {/* ===== VIEW MODAL ===== */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white rounded-md px-6 pb-6 max-w-3xl w-full relative overflow-y-auto max-h-[90vh] custom-scrollbar">
           <div className="sticky top-0 bg-white">
             <button
              className="cursor-pointer absolute top-3 right-3 text-gray-500"
              onClick={() => setViewItem(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 border-b py-3">
              {viewItem.subcategory}
            </h2>
           </div>
            {Object.entries(viewItem.details || {})
              .filter(([_, value]) => {
                // Skip empty strings
                if (typeof value === "string" && value.trim() === "")
                  return false;
                // Skip empty arrays
                if (
                  Array.isArray(value) &&
                  value.every((v) => !v || v.trim() === "")
                )
                  return false;
                // Skip null/undefined
                if (value == null) return false;
                return true;
              })
              .map(([key, value]) => (
                <div key={key} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {key.replace(/_/g, " ")}
                  </h3>
                  {Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-2">
                      {value.map((v, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editOpen && editItem && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={closeEdit} />
          <div className="relative w-full max-w-4xl bg-white rounded-md shadow-xl px-4 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center sticky top-0 bg-white py-4">
               <h2 className="text-xl font-bold">Edit Item</h2>
              <button className="cursor-pointer p-2 rounded-full border" onClick={closeEdit}>
                <FiX />
              </button>
            </div>
           
            <input
              type="text"
              placeholder="Category"
              className="border p-2 w-full mb-2 rounded"
              value={editItem.category}
              onChange={(e) => editChangeRoot("category", e.target.value)}
            />
            <input
              type="text"
              placeholder="Subcategory"
              className="border p-2 w-full mb-4 rounded"
              value={editItem.subcategory}
              onChange={(e) => editChangeRoot("subcategory", e.target.value)}
            />
            {Array.from(
              new Set(
                medicalInfo.flatMap((obj) => Object.keys(obj.details || {}))
              )
            ).map((key) => {
              const value = editItem.details[key] ?? "";
              return Array.isArray(value) ? (
                <div key={key} className="mb-4">
                  <label className="block font-semibold capitalize mb-2">
                    {key.replace(/_/g, " ")}
                  </label>
                  {value.map((val, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="border p-2 w-full rounded"
                        value={val}
                        onChange={(e) =>
                          editChangeArray(key, i, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="p-2 border rounded"
                        onClick={() => editRemoveArrayItem(key, i)}
                      >
                        <FiMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => editAddArrayItem(key)}
                    className="text-sm text-blue-600 cursor-pointer"
                  >
                    + Add {key.replace(/_/g, " ")}
                  </button>
                </div>
              ) : (
                <div key={key} className="mb-4">
                  <label className="block font-semibold capitalize mb-2">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded"
                    value={value}
                    onChange={(e) => editChangeDetail(key, e.target.value)}
                  />
                </div>
              );
            })}
            <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-2">
              <button onClick={closeEdit} className="px-4 py-2 border rounded cursor-pointer">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-[var(--1)] hover:bg-[var(--11)] text-white rounded cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== ADD BULK MODAL ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/10 flex justify-center items-start py-10 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl relative">
            <button
              className="absolute right-3 top-3 p-2 rounded-full border"
              onClick={closeModal}
            >
              <FiX />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Medical Info (Bulk)</h2>
            {bulkItems.map((item, idx) => (
              <div key={item.id} className="border p-4 rounded mb-6">
                <input
                  type="text"
                  placeholder="Category"
                  className="border p-2 w-full mb-2"
                  value={item.category}
                  onChange={(e) =>
                    handleChange(idx, "category", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Subcategory"
                  className="border p-2 w-full mb-2"
                  value={item.subcategory}
                  onChange={(e) =>
                    handleChange(idx, "subcategory", e.target.value)
                  }
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full mb-2"
                  value={item.details.description}
                  onChange={(e) =>
                    handleChangeDetails(idx, "description", e.target.value)
                  }
                />
                {["benefits", "methods", "key_features", "dosing_guidance"].map(
                  (field) => (
                    <div key={field} className="mb-3">
                      <label className="block font-semibold capitalize mb-1">
                        {field.replace("_", " ")}
                      </label>
                      {item.details[field].map((val, i) => (
                        <input
                          key={i}
                          type="text"
                          placeholder={`${field} ${i + 1}`}
                          className="border p-2 w-full mb-1"
                          value={val}
                          onChange={(e) =>
                            handleChangeArray(idx, field, i, e.target.value)
                          }
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddField(idx, field)}
                        className="text-sm text-blue-600"
                      >
                        + Add {field}
                      </button>
                    </div>
                  )
                )}
                {[
                  "target_audience",
                  "scientific_support",
                  "onset",
                  "duration",
                  "best_use",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.replace("_", " ")}
                    className="border p-2 w-full mb-2"
                    value={item.details[field]}
                    onChange={(e) =>
                      handleChangeDetails(idx, field, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
            <div className="flex justify-between">
              <button
                onClick={handleAddItem}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                + Add Another Item
              </button>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="cursor-pointer px-4 py-2 bg-[var(--1)] hover:bg-[var(--11)] text-white rounded"
                >
                  Save Items
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
