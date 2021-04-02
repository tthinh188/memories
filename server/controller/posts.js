import postMessage from '../models/postMessages.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
    } catch(error) {
        res.status(404).json({message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() }); 
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }   
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) { 
        // like
        post.likes.push(req.userId)
    }

    else {
        // dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId)); 
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}