// /services/sharepointService.js
import axios from 'axios';
import * as msal from '@azure/msal-node'; // Correcting import for msal-node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MSAL Configuration for authentication
const config = {
    auth: {
        clientId: "YOUR_CLIENT_ID",
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
    }
};

const cca = new msal.ConfidentialClientApplication(config);

// Function to get access token
export async function getAccessToken() {
    const tokenRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
    };

    try {
        const response = await cca.acquireTokenByClientCredential(tokenRequest);
        return response.accessToken;
    } catch (error) {
        console.log("Error fetching access token", error);
        throw new Error('Authentication failed');
    }
}

// Function to download file from SharePoint
export async function downloadFileFromSharePoint(fileUrl) {
    const token = await getAccessToken();

    // Make request to SharePoint to fetch file
    const response = await axios.get(fileUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        responseType: 'stream' // Streaming file for download
    });

    // Generate file path to save the file locally
    const fileName = path.basename(fileUrl); // Get file name from URL
    const filePath = path.join(__dirname, '../downloads', fileName); 

    // Write the file to local file system
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
    });
}
