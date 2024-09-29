// /routes/fileRoutes.js
import express from 'express';
import { downloadFile } from '../controllers/fileController.js';

export const router = express.Router();

// Define route for downloading file
router.get('/download', downloadFile);
