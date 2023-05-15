const router = require('express').Router();
const { Blog } = require('../../../models');

router.post('/', async (req, res) => {
  try {

    const dbBlogData = await Blog.create({
      content: req.body.content,
      userId: req.session.user.id, 
    });

    res.json(dbBlogData);
  } catch (error) {
    res.status(500).json({ error });
  }


});


module.exports = router;