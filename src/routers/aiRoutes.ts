import { Router } from "express";
import { generateContent } from "../controller/aiController";

// api/v1/ai/generate
const router = Router()

router.post("/generate", generateContent)

export default router