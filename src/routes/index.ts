import express from 'express';
import { isValidObjectId } from 'mongoose';
import PostModel, { Post } from '../db/models/post';

const router = express();
const blankPost: Post = {
  author: '',
  post_data: '',
  post_date: new Date(),
  title: '',
};

router.get('/', async (_req, res) => {
  const posts = await PostModel.find();
  res.render('index', {
    posts,
  });
});

router.get('/add', (req, res) =>
  res.render('post', {
    type: 'add',
    post: blankPost,
  })
);

router.post('/add', async (req, res) => {
  const { title, author, post_data } = req.body;
  const post = new PostModel({
    title,
    author,
    post_date: new Date(),
    post_data,
  });

  await post.save();
  return res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const post = await PostModel.findById(id);

  if (!post) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found!`,
    });
  }

  return res.render('post', {
    type: 'edit',
    post,
  });
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, post_data } = req.body;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const post = await PostModel.findById(id);

  if (!post) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found`,
    });
  }

  post.title = title;
  post.author = author;
  post.post_data = post_data;

  await post.save();
  return res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const post = await PostModel.findById(id);

  if (!post) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found!`,
    });
  }

  return res.render('post', {
    type: 'delete',
    post,
  });
});

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  await PostModel.findByIdAndDelete(id);
  return res.redirect('/');
});

export { router };
