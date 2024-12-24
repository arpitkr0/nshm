import express from "express";
import multer from "multer";
import {
  generateQuestions,
  downloadResult,
} from "../controllers/quesGen.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("syllabus"), generateQuestions);
router.get("/download", downloadResult);

export default router;
