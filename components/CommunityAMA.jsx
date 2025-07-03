import React from "react";
import { useAlumniNetwork } from "../hooks/useAlumniNetwork";

/**
 * Lists upcoming community AMA sessions.
 */
export default function CommunityAMA() {
  const { amaSessions } = useAlumniNetwork();

  return (
    <div
      className="p-4 border rounded bg-green-50"
      role="region"
      aria-labelledby="community-ama-title"
    >
      <h2 id="community-ama-title" className="font-semibold mb-2">
        Community AMA Sessions
      </h2>
      <ul
        className="list-disc list-inside text-sm max-h-48 overflow-auto space-y-2"
        tabIndex={0}
      >
        {amaSessions.length === 0 && <li>No AMA sessions scheduled.</li>}
        {amaSessions.map((session) => (
          <li key={session.id}>
            <strong>{session.topic}</strong> with <em>{session.host}</em> on{" "}
            {session.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
