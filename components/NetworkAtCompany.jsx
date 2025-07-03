import React, { useState, useEffect } from "react";
import { useAlumniNetwork } from "../hooks/useAlumniNetwork";

/**
 * Shows user's network connections at a given company.
 */
export default function NetworkAtCompany() {
  const { networkData } = useAlumniNetwork();
  const [company, setCompany] = useState("");
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const savedCompany = localStorage.getItem("networkCompany");
    if (savedCompany) setCompany(savedCompany);
  }, []);

  useEffect(() => {
    localStorage.setItem("networkCompany", company);
    setConnections(networkData[company] || []);
  }, [company, networkData]);

  return (
    <div
      className="p-4 border rounded bg-yellow-50"
      role="region"
      aria-labelledby="network-company-title"
    >
      <h2 id="network-company-title" className="font-semibold mb-2">
        Who Works Here?
      </h2>
      <input
        type="text"
        placeholder="Enter company name"
        className="border p-2 rounded w-full mb-3"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        aria-label="Enter company name to see network connections"
      />
      {company && (
        <ul className="text-sm max-h-40 overflow-auto space-y-1" tabIndex={0}>
          {connections.length === 0 && <li>No known connections at {company}.</li>}
          {connections.map((person) => (
            <li key={person.id}>
              {person.name} — {person.position}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
