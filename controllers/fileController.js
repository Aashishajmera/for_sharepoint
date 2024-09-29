// controllers/fileController.js
import { downloadFileFromSharePoint } from "../routers/services/sharepointService.js";


export const downloadFile = async (req, res) => {
    const fileUrl = req.query.fileUrl; // Expecting file URL to be passed as query param

    if (!fileUrl) {
        return res.status(400).send('fileUrl query parameter is required');
    }

    try {
        const filePath = await downloadFileFromSharePoint(fileUrl);
        res.download(filePath); // Send file to user for download
    } catch (error) {
        console.error("Error downloading file: ", error);
        res.status(500).send('Error downloading file');
    }
};
