/*
import express from 'express'
import {
    generateImage,
    // getAllImages, getImageById, deleteImageById
} from '../controller/imageController.js'
import userAuth from '../middleware/auth.js'
import multer from "multer";
import { removeBgImage } from "../controllers/imageController.js";

//const imageRouter = express.Router()
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post('/generate-image', userAuth, generateImage)
// router.get('/all-images', userAuth, getAllImages)
// router.get('/image/:id', userAuth, getImageById)
// router.delete('/image/:id', userAuth, deleteImageById)

router.post("/remove-bg", userAuth, upload.single("image"), removeBgImage)

export default router
*/
import express from 'express';
import multer from "multer";
import userAuth from '../middleware/auth.js';
import { generateImage, removeBgImage, uncropImage , upscaleImage } from '../controller/imageController.js'; // ✅ single, correct path

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate-image', userAuth, generateImage);

router.post("/remove-bg", userAuth, upload.single("image"), removeBgImage);

router.post("/uncrop", userAuth, upload.single("image"), uncropImage);

router.post("/upscale", userAuth, upload.single("image"), upscaleImage);

export default router;
