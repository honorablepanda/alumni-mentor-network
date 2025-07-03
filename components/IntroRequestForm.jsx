import React, { useState, useEffect } from "react";
import { useAlumniNetwork } from "../hooks/useAlumniNetwork";

/**
 * Form to request introduction to an alumni.
 */
export default function IntroRequestForm() {
  const { alumniList, generateIntroMessage, loading } = useAlumniNetwork();
  const [selectedAlumId, setSelectedAlumId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load saved selection and message from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("selectedAlumId");
    const savedMsg = localStorage.getItem("introMessage");
    if (savedId) setSelectedAlumId(savedId);
    if (savedMsg) setMessage(savedMsg);
  }, []);

  // Persist selection and message
  useEffect(() => {
    localStorage.setItem("selectedAlumId", selectedAlumId);
  }, [selectedAlumId]);

  useEffect(() => {
    localStorage.setItem("introMessage", message);
  }, [message]);

  const handleGenerate = async () => {
    if (!selectedAlumId) {
      setError("Please select an alumni.");
      return;
    }
    setError("");
    const alum = alumniList.find((a) => a.id === selectedAlumId);
    if (!alum) {
      setError("Selected alumni not found.");
      return;
    }
    try {
      const msg = await generateIntroMessage(alum.name);
      setMessage(msg);
    } catch {
      setError("Failed to generate introduction message. Please try again.");
    }
  };

  return (
    <div
      className="p-4 border rounded bg-blue-50"
      role="region"
      aria-labelledby="intro-request-title"
    >
      <h2 id="intro-request-title" className="font-semibold mb-2">
        Request Introduction
      </h2>
      {error && (
        <div className="text-red-600 mb-2" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <select
        className="border p-2 rounded w-full mb-2"
        value={selectedAlumId}
        onChange={(e) => setSelectedAlumId(e.target.value)}
        aria-label="Select alumni to request introduction"
        disabled={loading}
      >
        <option value="">Select Alumni</option>
        {alumniList.map((alum) => (
          <option key={alum.id} value={alum.id}>
            {alum.name} — {alum.company}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-700 text-white px-3 py-1 rounded"
        onClick={handleGenerate}
        disabled={!selectedAlumId || loading}
        aria-busy={loading}
      >
        {loading ? "Generating..." : "Generate Intro Message"}
      </button>
      {message && (
        <div
          className="mt-3 p-2 bg-white border rounded text-sm whitespace-pre-line"
          aria-live="polite"
          role="region"
          aria-label="Generated introduction message"
        >
          {message}
        </div>
      )}
    </div>
  );
}
