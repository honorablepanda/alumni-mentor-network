import React from "react";
import AlumniBrowser from "./components/AlumniBrowser";
import IntroRequestForm from "./components/IntroRequestForm";
import CommunityAMA from "./components/CommunityAMA";
import NetworkAtCompany from "./components/NetworkAtCompany";

export default function AlumniMentorNetworkHub() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">👥 Alumni & Mentor Network Hub</h1>
      <AlumniBrowser />
      <IntroRequestForm />
      <CommunityAMA />
      <NetworkAtCompany />
    </div>
  );
}
