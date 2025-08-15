import React, { useState, useEffect } from "react";
import { GoQuestion } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useAppData } from "../hooks/UseAppData";

const Faq = () => {
  const { faqs, fetcfaqhdata } = useAppData();

  // const loadfaqData = () => {
  //   fetcfaqhdata();
  // };

  const [localFaqs, setLocalFaqs] = useState(faqs || []);

  // useEffect(() => {
  //   fetcfaqhdata();
  // }, []);

  useEffect(() => {
    setLocalFaqs(faqs || []);
  }, [faqs]);

  const [modalType, setModalType] = useState(null); // 'single', 'bulk', or 'edit'
  const [singleQuestion, setSingleQuestion] = useState("");
  const [singleAnswer, setSingleAnswer] = useState("");
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [bulkFaqs, setBulkFaqs] = useState([{ question: "", answer: "" }]);
  const [saving, setSaving] = useState(false);

  // Open Modal
  const openModal = (type, faq = null) => {
    setModalType(type);
    if (type === "edit" && faq) {
      setSingleQuestion(faq.question);
      setSingleAnswer(faq.answer);
      setEditingFaqId(faq.id);
    } else if (type === "single") {
      setSingleQuestion("");
      setSingleAnswer("");
      setEditingFaqId(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingFaqId(null);
  };

  // Create or Update FAQ (single)
  const handleSaveOrUpdateFaq = async () => {
    if (!singleQuestion.trim() || !singleAnswer.trim()) {
      return alert("Both fields are required");
    }

    setSaving(true);

    try {
      const payload = {
        question: singleQuestion.trim(),
        answer: singleAnswer.trim(),
      };

      const url = editingFaqId
        ? `https://mfgprodbot.hellommj.com/api/insert_update_single_faq/?id=${editingFaqId}`
        : "https://mfgprodbot.hellommj.com/api/insert_update_single_faq/";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          `Request failed with status ${res.status}`;
        throw new Error(msg);
      }

      let savedFaq = null;
      if (data) {
        if (data.data && typeof data.data === "object") {
          savedFaq = data.data;
        } else if (data.id || data.question) {
          savedFaq = data;
        }
      }

      if (!savedFaq) {
        savedFaq = {
          id: editingFaqId || Date.now(),
          question: singleQuestion.trim(),
          answer: singleAnswer.trim(),
        };
      } else {
        savedFaq = {
          id: savedFaq.id ?? editingFaqId ?? Date.now(),
          question: savedFaq.question ?? singleQuestion.trim(),
          answer: savedFaq.answer ?? singleAnswer.trim(),
        };
      }

      if (editingFaqId) {
        setLocalFaqs((prev) =>
          prev.map((f) => (f.id === editingFaqId ? savedFaq : f))
        );
      } else {
        setLocalFaqs((prev) => [savedFaq, ...prev]);
      }

      closeModal();
    } catch (err) {
      console.error("Save FAQ error:", err);
      alert("Failed to save FAQ: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  // Save Bulk FAQs to API
  const handleSaveBulkFaqs = async () => {
    const validFaqs = bulkFaqs.filter(
      (f) => f.question.trim() && f.answer.trim()
    );

    if (validFaqs.length === 0) {
      return alert("Please add at least one valid FAQ");
    }

    setSaving(true);

    try {
      const res = await fetch(
        "https://mfgprodbot.hellommj.com/api/insert_faqs_bulk_both_db",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validFaqs), // Send exactly in desired format
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          `Request failed with status ${res.status}`;
        throw new Error(msg);
      }

      // Update UI
      const newFaqs = validFaqs.map((f) => ({
        id: Date.now() + Math.random(),
        question: f.question.trim(),
        answer: f.answer.trim(),
      }));

      setLocalFaqs((prev) => [...newFaqs, ...prev]);
      setBulkFaqs([{ question: "", answer: "" }]);
      closeModal();
    } catch (err) {
      console.error("Bulk Save FAQ error:", err);
      alert("Failed to save FAQs: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleBulkChange = (index, field, value) => {
    const updated = [...bulkFaqs];
    updated[index][field] = value;
    setBulkFaqs(updated);
  };

  const addBulkRow = () => {
    setBulkFaqs([...bulkFaqs, { question: "", answer: "" }]);
  };

  // Delete handler
  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    const url = `https://mfgprodbot.hellommj.com/api/delete_faqs/${id}`;

    try {
      let res = await fetch(url);
      if (!res.ok) {
        res = await fetch(url, { method: "DELETE" });
      }

      let payload = null;
      try {
        payload = await res.json();
      } catch (e) {}

      if (!res.ok) {
        const message =
          payload?.message ||
          payload?.error ||
          `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      setLocalFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Delete FAQ error:", err);
      alert("Failed to delete FAQ: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[var(--1)]/20">
      <div className="px-8 py-4">
        <Navbar />
      </div>

      <div className="px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <GoQuestion className="text-[var(--1)] text-2xl" />
            <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openModal("single")}
              className="flex items-center gap-2 bg-[var(--4)]/80 cursor-pointer hover:bg-[var(--4)] text-white px-4 py-2 rounded shadow"
            >
              <IoIosAdd className="text-xl" /> Add Single FAQ
            </button>
            <button
              onClick={() => openModal("bulk")}
              className="flex items-center gap-2 bg-[var(--1)] hover:bg-[var(--11)] cursor-pointer text-white px-4 py-2 rounded shadow"
            >
              <IoIosAdd className="text-xl" /> Add Bulk FAQs
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 pb-5">
          {localFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg p-4 shadow border flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">{faq.question}</h2>
                <p className="text-gray-600 mt-1">{faq.answer}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal("edit", faq)}
                  className="text-[var(--4)]/90 hover:text-[var(--4)] cursor-pointer"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-[var(--2)] hover:text-red-500 cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {modalType && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white py-4 rounded-md">
            <div className="bg-white rounded-md p-6 w-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-red-700 text-lg"
              >
                ✕
              </button>

              {/* Single FAQ Form */}
              {(modalType === "single" || modalType === "edit") && (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {modalType === "edit" ? "Edit FAQ" : "Add Single FAQ"}
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={singleQuestion}
                    onChange={(e) => setSingleQuestion(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                  />
                  <textarea
                    placeholder="Enter answer"
                    value={singleAnswer}
                    onChange={(e) => setSingleAnswer(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                    rows={3}
                  />
                  <button
                    onClick={handleSaveOrUpdateFaq}
                    disabled={saving}
                    className="cursor-pointer bg-[var(--1)] hover:bg-[var(--11)] text-white px-4 py-2 rounded disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : modalType === "edit"
                      ? "Update FAQ"
                      : "Save FAQ"}
                  </button>
                </>
              )}

              {/* Bulk FAQ Form */}
              {modalType === "bulk" && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Add Bulk FAQs</h2>
                  {bulkFaqs.map((faq, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                      <input
                        type="text"
                        placeholder="Enter question"
                        value={faq.question}
                        onChange={(e) =>
                          handleBulkChange(index, "question", e.target.value)
                        }
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                      />
                      <textarea
                        placeholder="Enter answer"
                        value={faq.answer}
                        onChange={(e) =>
                          handleBulkChange(index, "answer", e.target.value)
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                        rows={2}
                      />
                    </div>
                  ))}
                  <button
                    onClick={addBulkRow}
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded mr-2"
                  >
                    + Add Another FAQ
                  </button>
                  <button
                    onClick={handleSaveBulkFaqs}
                    disabled={saving}
                    className="cursor-pointer bg-[var(--1)] hover:bg-[var(--11)] text-white px-4 py-2 rounded disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save All FAQs"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faq;
