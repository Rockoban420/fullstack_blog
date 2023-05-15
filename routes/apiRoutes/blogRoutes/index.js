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

// router.post('/upload', (req, res) => {
//   // Get the file that was set to our field named "image"
//   console.log(req.files);
//   if (!req.files) return res.sendStatus(400).json({message: 'No image submitted 2'}) ;

//   const { image } = req.files;

//   // If no image submitted, exit
//   if (!image) return res.sendStatus(400).json({message: 'No image submitted'});

//   // Move the uploaded image to our upload folder
//   image.mv(__dirname  + '/images/' + image.name);

//   // Send response
//   res.sendStatus(200).json({name: image.name, path: `/images/${image.name}`});
// });

module.exports = router;