import React from "react";

export default function CompanyInfoDisplay({ data, onDelete }) {
  if (!data) return <p>No data available</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">About Company</h2>
      <p><strong>Overview:</strong> {data.about_company.overview}</p>
      <p><strong>Mission:</strong> {data.about_company.our_mission}</p>
      <p><strong>Commitment:</strong> {data.about_company.our_commitment}</p>
      <p><strong>Vision:</strong> {data.about_company.our_vission}</p>
      <p><strong>About CEO:</strong> {data.about_company.about_ceo}</p>

      <h2 className="text-xl font-bold mt-4">Team</h2>
      <p>{data.about_team.team_intro}</p>
      {data.about_team.team_members.map((member, idx) => (
        <div key={idx} className="border p-2 mt-2">
          <p><strong>Name:</strong> {member.team_member_name}</p>
          <p><strong>Position:</strong> {member.team_member_position}</p>
          <p><strong>Bio:</strong> {member.team_member_bio}</p>
          <p><strong>Location:</strong> {member.team_member_location}</p>
          <a href={member.team_member_page_url} target="_blank" rel="noreferrer" className="text-blue-500">Profile</a>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">Pricing</h2>
      <p>{data.pricing.intro}</p>
      {data.pricing.packages.map((pkg, idx) => (
        <div key={idx} className="border p-2 mt-2">
          <p><strong>Title:</strong> {pkg.title}</p>
          <p><strong>Price:</strong> {pkg.price}</p>
          <ul className="list-disc pl-6">
            {pkg.includes.map((inc, i) => <li key={i}>{inc}</li>)}
          </ul>
        </div>
      ))}
      <p><strong>Note:</strong> {data.pricing.note}</p>

      <button
        onClick={() => onDelete(2)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete (id: 2)
      </button>
    </div>
  );
}
