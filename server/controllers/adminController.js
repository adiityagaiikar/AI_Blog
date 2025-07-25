import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Comment from '../models/Comment.js';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        fs.unlinkSync(imageFile.path);

        const imageUrl = uploadResponse.url;

        const newBlog = new Blog({
            title,
            description,
            category,
            image: imageUrl,
            isPublished: true
        });

        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
