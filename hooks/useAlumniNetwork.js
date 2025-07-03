import { useState, useCallback } from "react";
import { mockAlumniList, mockAMASessions, mockNetworkData } from "../mock/mockAlumniData";

/**
 * Hook providing dummy data and AI simulation for Alumni Network Hub.
 */
export const useAlumniNetwork = () => {
  const [alumniList] = useState(mockAlumniList);
  const [amaSessions] = useState(mockAMASessions);
  const [networkData] = useState(mockNetworkData);
  const [loading, setLoading] = useState(false);

  /**
   * Simulates AI-generated intro message for a selected alumni.
   * @param {string} alumName
   */
  const generateIntroMessage = useCallback(async (alumName) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(`Hi ${alumName},\n\nI’d love an introduction to discuss career advice and opportunities. Thanks!`);
      }, 1200);
    });
  }, []);

  return {
    alumniList,
    amaSessions,
    networkData,
    generateIntroMessage,
    loading,
  };
};
