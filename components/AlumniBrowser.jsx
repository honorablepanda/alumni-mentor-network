import React, { useState, useEffect } from "react";
import { useAlumniNetwork } from "../hooks/useAlumniNetwork";

/**
 * Component to browse and search alumni.
 */
export default function AlumniBrowser() {
  const { alumniList } = useAlumniNetwork();
  const [search, setSearch] = useState("");

  // Persist search term
  useEffect(() => {
    const savedSearch = localStorage.getItem("alumniSearch");
    if (savedSearch) setSearch(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem("alumniSearch", search);
  }, [search]);

  const filtered = alumniList.filter(
    (alum) =>
      alum.name.toLowerCase().includes(search.toLowerCase()) ||
      alum.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-4 border rounded bg-gray-50"
      role="region"
      aria-labelledby="alumni-browser-title"
    >
      <h2 id="alumni-browser-title" className="font-semibold mb-2">
        Browse Alumni
      </h2>
      <input
        type="search"
        placeholder="Search by name or company"
        className="border p-2 rounded w-full mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search alumni by name or company"
      />
      <ul className="max-h-60 overflow-auto text-sm space-y-2" tabIndex={0}>
        {filtered.length === 0 && <li>No alumni found.</li>}
        {filtered.map((alum) => (
          <li key={alum.id} className="border-b pb-2">
            <div>
              <strong>{alum.name}</strong> — {alum.company}
            </div>
            <div className="text-gray-600 text-xs">{alum.role}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
