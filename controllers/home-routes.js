const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, Comment, User } = require('../models');

//Middleware
const withAuth = require('../utils/auth');


// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: [
        [sequelize.fn('date_format', sequelize.col('CREATED_AT'), '%m-%d-%Y'), 'created_at'], 
        'id', 
        'title',
        'content',
      ],
      include: [
        User
      ],      
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    console.log(posts)
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [
            User,
          ]
        }
      ]
    });

    const post = dbPostData.get({ plain: true });

    // Send over the 'loggedIn' session variable to the 'post' template
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new-post/', withAuth, (req,res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

// GET one painting
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
