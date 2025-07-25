import express from 'express';
import { adminLogin, addBlog, getAllComments, getAllBlogsAdmin, deleteCommentById, approveCommentById, getDashboard } from '../controllers/adminController.js';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { getAllBlogs } from '../controllers/blogController.js';

const adminRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

adminRouter.post("/login", adminLogin);
adminRouter.post("/blog/add", upload.single('image'), addBlog);

adminRouter.get("/comments",auth, getAllComments);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment",auth, deleteCommentById);
adminRouter.post("/approve-comment",auth, approveCommentById);
adminRouter.get("/dashboard",auth, getDashboard);

export default adminRouter;
