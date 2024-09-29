// /app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routers/fileRoutes.js';

// Handle __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve the downloads folder (if necessary)
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// Use file routes
app.use('/api/files', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
