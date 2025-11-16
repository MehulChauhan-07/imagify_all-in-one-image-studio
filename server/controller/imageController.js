import userModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"

export const generateImage = async (req, res) => {
    try {
        const userId = req.userId || (req.body && req.body.userId);
        const prompt = req.body?.prompt?.trim();

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing details' });
        }

        if (!process.env.CLIPDROP_API_KEY) {
            return res.status(500).json({ success: false, message: 'Image service not configured' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.creditBalance <= 0) {
            return res.status(402).json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const clipDropResponse = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer',
            timeout: 60000
        });

        const base64Image = Buffer.from(clipDropResponse.data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedBalance = Math.max(0, user.creditBalance - 1);
        await userModel.findByIdAndUpdate(userId, { creditBalance: updatedBalance });

        return res.json({
            success: true,
            message: "Image Generated",
            creditBalance: updatedBalance,
            resultImage
        });

    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Failed to generate image';
        return res.status(status).json({ success: false, message });
    }
}
