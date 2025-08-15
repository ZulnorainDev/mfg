import React, { useState } from "react";

export default function CompanyInfoForm({ onSave }) {
  const [formData, setFormData] = useState({
    about_company: {
      overview: "",
      our_mission: "",
      our_commitment: "",
      our_vission: "",
      about_ceo: ""
    },
    about_team: {
      team_intro: "",
      team_members: [
        {
          team_member_name: "",
          team_member_position: "",
          team_member_bio: "",
          team_member_page_url: "",
          team_member_location: ""
        }
      ]
    },
    pricing: {
      intro: "",
      packages: [
        { title: "", price: "", includes: [] }
      ],
      note: ""
    }
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Add / Update Company Info</h2>
      
      <input
        type="text"
        placeholder="Overview"
        value={formData.about_company.overview}
        onChange={(e) => handleChange("about_company", "overview", e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Mission"
        value={formData.about_company.our_mission}
        onChange={(e) => handleChange("about_company", "our_mission", e.target.value)}
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
