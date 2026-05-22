import { Router } from "express"
import { saveBlog, getAllBlogs, getMyBlogs } from "../controller/blogController"
import { authenticate } from "../middleware/authMiddleware"
import { requireRole } from "../middleware/requireRole"
import { UserRole } from "../models/enums/userRole"
import { upload } from "../middleware/uploadMiddleware"
 
const router = Router()
 
// PUBLIC — anyone can read blogs
router.get("/", getAllBlogs)
 
// PROTECTED — ADMIN & MANAGER only
router.post("/create",
  authenticate,
  requireRole([UserRole.ADMIN, UserRole.MANAGER]),
  upload.single("image"),
  saveBlog
)
 
// PROTECTED — own blogs only
router.get("/me",
  authenticate,
  requireRole([UserRole.ADMIN, UserRole.MANAGER]),
  getMyBlogs
)
 
export default router