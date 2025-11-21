import userModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"
import fs from "fs";
import path from "path";

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

export const getAllImages = async (req, res) => {
    try {
        const userId = req.userId || (req.body && req.body.userId);
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Missing user ID' });

        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// controller for handling image background removal
const removeBgImage = async (req, res) => {
    try {
        console.log("Image removal request received:", {
            body: req.body,
            file: req.file
                ? {
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                    buffer: req.file.buffer ? "Buffer exists" : "No buffer",
                }
                : "No file",
            headers: req.headers,
            method: req.method,
            path: req.path,
            url: req.originalUrl,
            route: req.route,
        });

        // Prefer auth-derived user over body (multer can overwrite req.body)
        const userId = req.userId || (req.body && req.body.userId);

        console.log("Request data:", {
            userIdFromAuth: req.userId,
            userIdFromBody: req.body?.userId,
            headers: Object.keys(req.headers),
            authHeader: req.headers.authorization ? "Present" : "Missing",
        });

        if (!userId) {
            console.log(
                "No userId found in request. Auth middleware may have failed.",
                "Body:",
                req.body,
                "User on req:",
                req.user
            );
            return res.status(401).json({
                success: false,
                error: "Authentication required",
            });
        }

        console.log("Processing image for user:", userId);

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found with id:", userId);
            return res.status(403).json({
                success: false,
                error: "User not found or unauthorized",
            });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                error: "Insufficient credits",
                creditBalance: user.creditBalance,
            });
        }

        if (!req.file) {
            console.log("No image file found in request");
            return res.status(400).json({
                success: false,
                error: "No image file found",
            });
        }

        // Check if we have a buffer (memory storage) or path (disk storage)
        let imageBuffer;
        if (req.file.buffer) {
            // Memory storage - use buffer directly
            imageBuffer = req.file.buffer;
            console.log("Using file buffer from memory storage");
        } else if (req.file.path) {
            // Disk storage - read file
            try {
                imageBuffer = fs.readFileSync(req.file.path);
                console.log("Read file from disk storage:", req.file.path);
            } catch (readError) {
                console.error("Error reading file from disk:", readError);
                return res.status(400).json({
                    success: false,
                    error: "Error reading uploaded file",
                    details: readError.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: "Invalid file data",
            });
        }

        const formData = new FormData();
        formData.append("image_file", imageBuffer, {
            filename: req.file.originalname || "image.jpg",
            contentType: req.file.mimetype,
        });

        console.log(
            "Calling ClipDrop API with API key:",
            process.env.CLIPDROP_API_KEY ? "API key exists" : "API key missing"
        );

        if (!process.env.CLIPDROP_API_KEY) {
            console.error("CLIPDROP_API_KEY environment variable is missing");
            return res.status(500).json({
                success: false,
                error: "Server configuration error - missing API key",
                details: "Contact administrator",
            });
        }

        const { data } = await axios.post(
            `https://clipdrop-api.co/remove-background/v1`,
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
            }
        );

        // save the result image
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // update user's credit balance
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });

        // Get updated user data
        const updatedUser = await userModel.findById(userId);
        console.log("Credit balance updated:", updatedUser.creditBalance);

        res.status(200).json({
            success: true,
            resultImage,
            creditBalance: updatedUser.creditBalance, // return updated credit balance
            message: "Background removed successfully",
        });
    } catch (error) {
        console.error("Error removing background:", error);

        // Check for specific error types
        if (error.code === "ENOENT") {
            console.error("File not found error:", error.path);
            return res.status(400).json({
                success: false,
                error: "Image file not found or corrupted",
                details: error.message,
            });
        }

        if (error.response) {
            // API error response
            console.error("ClipDrop API error:", {
                status: error.response.status,
                data: error.response.data,
            });
            return res.status(500).json({
                success: false,
                error: "Background removal service error",
                details: `API returned ${error.response.status}`,
            });
        }

        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
            return res.status(500).json({
                success: false,
                error: "Cannot connect to background removal service",
                details: error.message,
            });
        }

        res.status(500).json({
            success: false,
            error: "Failed to remove background. Please try again later.",
            details: error.message,
        });
    }
};

// controller for handling image uncrop / extend
const uncropImage = async (req, res) => {
    try {
        console.log("Uncrop image request received:", {
            body: req.body,
            file: req.file
                ? {
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                    buffer: req.file.buffer ? "Buffer exists" : "No buffer",
                }
                : "No file",
            headers: req.headers,
            method: req.method,
            path: req.path,
            url: req.originalUrl,
            route: req.route,
        });

        // Prefer auth-derived user over body (multer can overwrite req.body)
        const userId = req.userId || (req.body && req.body.userId);

        console.log("Request data (uncrop):", {
            userIdFromAuth: req.userId,
            userIdFromBody: req.body?.userId,
            headers: Object.keys(req.headers),
            authHeader: req.headers.authorization ? "Present" : "Missing",
        });

        if (!userId) {
            console.log(
                "No userId found in request. Auth middleware may have failed.",
                "Body:",
                req.body,
                "User on req:",
                req.user
            );
            return res.status(401).json({
                success: false,
                error: "Authentication required",
            });
        }

        console.log("Processing uncrop for user:", userId);

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found with id:", userId);
            return res.status(403).json({
                success: false,
                error: "User not found or unauthorized",
            });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                error: "Insufficient credits",
                creditBalance: user.creditBalance,
            });
        }

        if (!req.file) {
            console.log("No image file found in request (uncrop)");
            return res.status(400).json({
                success: false,
                error: "No image file found",
            });
        }

        // Check if we have a buffer (memory storage) or path (disk storage)
        let imageBuffer;
        if (req.file.buffer) {
            // Memory storage - use buffer directly
            imageBuffer = req.file.buffer;
            console.log("Using file buffer from memory storage (uncrop)");
        } else if (req.file.path) {
            // Disk storage - read file
            try {
                imageBuffer = fs.readFileSync(req.file.path);
                console.log("Read file from disk storage (uncrop):", req.file.path);
            } catch (readError) {
                console.error("Error reading file from disk (uncrop):", readError);
                return res.status(400).json({
                    success: false,
                    error: "Error reading uploaded file",
                    details: readError.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: "Invalid file data",
            });
        }

        // Build form-data for Clipdrop Uncrop API
        const formData = new FormData();
        formData.append("image_file", imageBuffer, {
            filename: req.file.originalname || "image.jpg",
            contentType: req.file.mimetype,
        });

        // Optional extend parameters from body
        const {
            extend_left,
            extend_right,
            extend_up,
            extend_down,
            seed,
        } = req.body || {};

        if (extend_left !== undefined) formData.append("extend_left", String(extend_left));
        if (extend_right !== undefined) formData.append("extend_right", String(extend_right));
        if (extend_up !== undefined) formData.append("extend_up", String(extend_up));
        if (extend_down !== undefined) formData.append("extend_down", String(extend_down));
        if (seed !== undefined) formData.append("seed", String(seed));

        console.log(
            "Calling ClipDrop Uncrop API with API key:",
            process.env.CLIPDROP_API_KEY ? "API key exists" : "API key missing"
        );

        if (!process.env.CLIPDROP_API_KEY) {
            console.error("CLIPDROP_API_KEY environment variable is missing");
            return res.status(500).json({
                success: false,
                error: "Server configuration error - missing API key",
                details: "Contact administrator",
            });
        }

        const { data, headers } = await axios.post(
            `https://clipdrop-api.co/uncrop/v1`,
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
            }
        );

        // save the result image
        const base64Image = Buffer.from(data, "binary").toString("base64");
        // Clipdrop returns JPEG for uncrop
        const resultImage = `data:image/jpeg;base64,${base64Image}`;

        // update user's credit balance
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });

        // Get updated user data
        const updatedUser = await userModel.findById(userId);
        console.log("Credit balance updated (uncrop):", updatedUser.creditBalance);

        res.status(200).json({
            success: true,
            resultImage,
            creditBalance: updatedUser.creditBalance,
            message: "Image uncropped successfully",
            clipdropCredits: {
                remaining: headers["x-remaining-credits"],
                consumed: headers["x-credits-consumed"],
            },
        });
    } catch (error) {
        console.error("Error uncropping image:", error);

        // Check for specific error types
        if (error.code === "ENOENT") {
            console.error("File not found error (uncrop):", error.path);
            return res.status(400).json({
                success: false,
                error: "Image file not found or corrupted",
                details: error.message,
            });
        }

        if (error.response) {
            // API error response
            console.error("ClipDrop Uncrop API error:", {
                status: error.response.status,
                data: error.response.data,
            });
            return res.status(500).json({
                success: false,
                error: "Uncrop service error",
                details: `API returned ${error.response.status}`,
            });
        }

        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
            return res.status(500).json({
                success: false,
                error: "Cannot connect to uncrop service",
                details: error.message,
            });
        }

        res.status(500).json({
            success: false,
            error: "Failed to uncrop image. Please try again later.",
            details: error.message,
        });
    }
};

// controller for handling image upscaling
const upscaleImage = async (req, res) => {
    try {
        console.log("Upscale image request received:", {
            body: req.body,
            file: req.file
                ? {
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                    buffer: req.file.buffer ? "Buffer exists" : "No buffer",
                }
                : "No file",
            headers: req.headers,
            method: req.method,
            path: req.path,
            url: req.originalUrl,
            route: req.route,
        });

        // Prefer auth-derived user over body (multer can overwrite req.body)
        const userId = req.userId || (req.body && req.body.userId);

        console.log("Request data (upscale):", {
            userIdFromAuth: req.userId,
            userIdFromBody: req.body?.userId,
            headers: Object.keys(req.headers),
            authHeader: req.headers.authorization ? "Present" : "Missing",
        });

        if (!userId) {
            console.log(
                "No userId found in request. Auth middleware may have failed.",
                "Body:",
                req.body,
                "User on req:",
                req.user
            );
            return res.status(401).json({
                success: false,
                error: "Authentication required",
            });
        }

        console.log("Processing upscaling for user:", userId);

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found with id:", userId);
            return res.status(403).json({
                success: false,
                error: "User not found or unauthorized",
            });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                error: "Insufficient credits",
                creditBalance: user.creditBalance,
            });
        }

        if (!req.file) {
            console.log("No image file found in request (upscale)");
            return res.status(400).json({
                success: false,
                error: "No image file found",
            });
        }

        // Validate and parse target dimensions
        const { target_width, target_height } = req.body || {};

        if (!target_width || !target_height) {
            return res.status(400).json({
                success: false,
                error: "target_width and target_height are required",
            });
        }

        const width = parseInt(target_width, 10);
        const height = parseInt(target_height, 10);

        if (
            Number.isNaN(width) ||
            Number.isNaN(height) ||
            width < 1 ||
            width > 4096 ||
            height < 1 ||
            height > 4096
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid target_width or target_height. Must be integers between 1 and 4096.",
            });
        }

        // Check if we have a buffer (memory storage) or path (disk storage)
        let imageBuffer;
        if (req.file.buffer) {
            // Memory storage - use buffer directly
            imageBuffer = req.file.buffer;
            console.log("Using file buffer from memory storage (upscale)");
        } else if (req.file.path) {
            // Disk storage - read file
            try {
                imageBuffer = fs.readFileSync(req.file.path);
                console.log("Read file from disk storage (upscale):", req.file.path);
            } catch (readError) {
                console.error("Error reading file from disk (upscale):", readError);
                return res.status(400).json({
                    success: false,
                    error: "Error reading uploaded file",
                    details: readError.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: "Invalid file data",
            });
        }

        // Build form-data for Clipdrop Image Upscaling API
        const formData = new FormData();
        formData.append("image_file", imageBuffer, {
            filename: req.file.originalname || "image.jpg",
            contentType: req.file.mimetype,
        });
        formData.append("target_width", String(width));
        formData.append("target_height", String(height));

        console.log(
            "Calling ClipDrop Upscale API with API key:",
            process.env.CLIPDROP_API_KEY ? "API key exists" : "API key missing"
        );

        if (!process.env.CLIPDROP_API_KEY) {
            console.error("CLIPDROP_API_KEY environment variable is missing");
            return res.status(500).json({
                success: false,
                error: "Server configuration error - missing API key",
                details: "Contact administrator",
            });
        }

        const { data, headers } = await axios.post(
            `https://clipdrop-api.co/image-upscaling/v1/upscale`,
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
            }
        );

        // save the result image (webp or jpeg depending on Clipdrop)
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const contentType =
            headers["content-type"] || "image/jpeg"; // fallback

        const resultImage = `data:${contentType};base64,${base64Image}`;

        // update user's credit balance
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });

        // Get updated user data
        const updatedUser = await userModel.findById(userId);
        console.log("Credit balance updated (upscale):", updatedUser.creditBalance);

        res.status(200).json({
            success: true,
            resultImage,
            creditBalance: updatedUser.creditBalance,
            message: "Image upscaled successfully",
            clipdropCredits: {
                remaining: headers["x-remaining-credits"],
                consumed: headers["x-credits-consumed"],
            },
            size: {
                target_width: width,
                target_height: height,
            },
        });
    } catch (error) {
        console.error("Error upscaling image:", error);

        // Check for specific error types
        if (error.code === "ENOENT") {
            console.error("File not found error (upscale):", error.path);
            return res.status(400).json({
                success: false,
                error: "Image file not found or corrupted",
                details: error.message,
            });
        }

        if (error.response) {
            // API error response
            console.error("ClipDrop Upscale API error:", {
                status: error.response.status,
                data: error.response.data,
            });
            return res.status(500).json({
                success: false,
                error: "Upscale service error",
                details: `API returned ${error.response.status}`,
            });
        }

        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
            return res.status(500).json({
                success: false,
                error: "Cannot connect to upscaling service",
                details: error.message,
            });
        }

        res.status(500).json({
            success: false,
            error: "Failed to upscale image. Please try again later.",
            details: error.message,
        });
    }
};

export { removeBgImage, uncropImage, upscaleImage };
