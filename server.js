/*global __dirname */
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, './dist')));

// Route all requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// Start the server on a specific port (e.g., 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
