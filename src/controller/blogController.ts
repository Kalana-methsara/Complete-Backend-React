import { Request, Response } from "express"
import cloudinary from "../config/cloudinary"
import { BlogModel } from "../models/blogModel"
import { AuthRequest } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/asyncHandler"
 
// ─── CREATE BLOG (ADMIN, MANAGER) ─────────────────────────
// POST /api/v1/blog/create
export const saveBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body
  let imageUrl = ''
 
  // If file uploaded → stream to Cloudinary
  if (req.file) {
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog" },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      uploadStream.end(req.file?.buffer)
    })
    imageUrl = result.secure_url
  }
 
  // Save blog to MongoDB
  const newBlog = await BlogModel.create({
    title,
    content,
    imageURL: imageUrl,
    author:   req.user?._id,
  })
 
  res.status(201).json({ message: "Blog created successfully!", data: newBlog })
})
 
// ─── GET ALL BLOGS (PUBLIC, Paginated) ─────────────────────
// GET /api/v1/blog/
export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const page  = parseInt(req.query.page  as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const skip  = (page - 1) * limit
 
  const [blogs, totalDataCount] = await Promise.all([
    BlogModel.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip).limit(limit),
    BlogModel.countDocuments()
  ])
 
  res.status(200).json({
    data: blogs,
    totalPage: Math.ceil(totalDataCount / limit),
    totalDataCount,
    page,
  })
})
 
// ─── GET MY BLOGS (ADMIN, MANAGER — own blogs) ─────────────
// GET /api/v1/blog/me
export const getMyBlogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page  = parseInt(req.query.page  as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const skip  = (page - 1) * limit
 
  const [blogs, totalDataCount] = await Promise.all([
    BlogModel.find({ author: req.user?._id })
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip).limit(limit),
    BlogModel.countDocuments({ author: req.user?._id })
  ])
 
  res.status(200).json({
    data: blogs,
    totalPage: Math.ceil(totalDataCount / limit),
    totalDataCount,
    page,
  })
})
