// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Pfad zur JSON-Datei
const dataFilePath = path.join(__dirname, "results.json");

// Funktion zum Laden der Ergebnisse
const loadResults = () => {
  try {
    const dataBuffer = fs.readFileSync(dataFilePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    // Wenn die Datei nicht existiert oder leer ist
    return [];
  }
};

// Funktion zum Speichern der Ergebnisse
const saveResults = (results) => {
  const dataJSON = JSON.stringify(results, null, 2);
  fs.writeFileSync(dataFilePath, dataJSON);
};

// GET /api/results - Alle Spielergebnisse abrufen
app.get("/api/results", (req, res) => {
  const results = loadResults();
  res.json(results);
});

// POST /api/results - Ein neues Spielergebnis speichern
app.post("/api/results", (req, res) => {
  const { winner, timestamp } = req.body;

  if (!winner || !timestamp) {
    return res
      .status(400)
      .json({ error: "Winner and timestamp are required." });
  }

  const newResult = { winner, timestamp };
  const results = loadResults();
  results.push(newResult);
  saveResults(results);

  res.status(201).json(newResult);
});

// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
