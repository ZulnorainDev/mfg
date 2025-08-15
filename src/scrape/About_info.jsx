import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function About_info() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return (
      <div className="p-6">
        <Navbar />
        <p>No data available. <button onClick={() => navigate(-1)} className="text-blue-600 underline">Go Back</button></p>
      </div>
    );
  }

  const { about_company, about_team, pricing } = item;

  return (
    <div className="p-6 space-y-6">
      <Navbar />

      {/* --- Company Info --- */}
      <section>
        <h1 className="text-3xl font-bold mb-4">About Company</h1>
        {Object.entries(about_company || {}).map(([key, value]) => (
          <div key={key} className="mb-3">
            <h2 className="font-semibold capitalize">{key.replace(/_/g, " ")}</h2>
            <p className="text-gray-700">{value}</p>
          </div>
        ))}
      </section>

      {/* --- Team Info --- */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Our Team</h1>
        <p className="mb-4">{about_team?.team_intro}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {about_team?.team_members?.map((member, i) => (
            <div key={i} className="p-4 border rounded-lg shadow">
              <h2 className="font-semibold">{member.team_member_name}</h2>
              <p className="text-sm text-gray-500">{member.team_member_position}</p>
              <p className="mt-2 text-gray-700">{member.team_member_bio}</p>
              {member.team_member_page_url && (
                <a
                  href={member.team_member_page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Profile
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- Pricing Info --- */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="mb-2">{pricing?.intro}</p>
        <p className="text-sm text-gray-500 mb-4">{pricing?.note}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {pricing?.packages?.map((pkg, i) => (
            <div key={i} className="p-4 border rounded-lg shadow">
              <h2 className="font-semibold">{pkg.title}</h2>
              <p className="text-green-600 font-bold">{pkg.price}</p>
              <ul className="list-disc pl-5 mt-2">
                {pkg.includes.map((inc, idx) => <li key={idx}>{inc}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
