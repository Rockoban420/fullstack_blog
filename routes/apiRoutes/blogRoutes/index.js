const router = require('express').Router();
const { Blog } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(400).json({message: 'You must be logged in to create a blog'});
    }

    const dbBlogData = await Blog.create({
      content: req.body.content,
      userId: req.session.user.id, 
      image: req.body.image,
    });

    res.status(200).json(dbBlogData);

  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;