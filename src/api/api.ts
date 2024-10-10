// src/api/api.ts
import axios from "axios";

const API_URL = "http://localhost:5010/api"; // Ersetze dies mit deiner API-URL

export const saveGameResult = async (result: {
  winner: string;
  timestamp: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/results`, result);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Speichern des Spielergebnisses:", error);
    throw error;
  }
};

export const fetchGameResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Spielergebnisse:", error);
    throw error;
  }
};
