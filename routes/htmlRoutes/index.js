const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// /users
// /users  - render all the users
// /Blogs - renders all the Blogs
// router.get('/', async (req, res) => {
//   try {
//     if (req.session.loggedIn) {
//       res.render('home', {
//         user: req.session.user
//       });
//     }
//   } catch (error) {
//     res.status(500).json({error});
//   }
// });


router.get('/signup', async (req, res) => {
  try {
    const usersData = await User.findAll();
    const users = usersData.map(user => user.get({plain: true}));

    // req.session.save(() => {})

    res.render('signup', {
      sentence: 'This is a sentence',
      users,
      loggedInUser: req.session.user || null,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});

router.get('/login', async (req, res) => {
  try {
    const usersData = await User.findAll();
    const users = usersData.map(user => user.get({plain: true}));

    // req.session.save(() => {})

    res.render('login', {
      sentence: 'This is a sentence',
      users,
      loggedInUser: req.session.user || null,
    });


  } catch (error) {
    res.status(500).json({error});
  }
});

router.get('/homepage', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const blogsData = await Blog.findAll(
      {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['content', 'createdAt'],
          }
        ]
      }
    );
    const blogs = blogsData.map(blog => blog.get({plain: true}));
      console.log(blogs);
    res.render('home', {
      blogs,
      loggedInUser: req.session.user || null,
    })
  } else {
    res.redirect('/login');
    return;
  }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get('/users/:userId', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const { userId } = req.params;
    const userData = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          attributes: ['id', 'content', 'createdAt',],
        }
      ]
    });

    const user = userData.get({plain: true});

    res.render('user_profile', {
      user,
      loggedInUser: req.session.user || null,
    });
  } else {
    res.redirect('/login');
    return;
  }
  } catch (error) {
    res.status(500).json({error});
  }
});

router.get('/blogs/:blogId', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const { blogId } = req.params;
    const blogData = await Blog.findByPk(blogId, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
    const commentData = await Comment.findAll(
      {
        where: {
          blogId: blogId,
        },
      }, {
      include: [
        {
          model: User,
          attributes: ['username'],
      },
      ]
    });

    const comment = commentData.map(comment => comment.get({plain: true}));
    const blog = blogData.get({plain: true});
    // const commenters = [];
    // for (let i = 0; i < comment.length; i++) {
    //   commenters.push(comment[i].userCommentId);
    // }
    console.log(comment);
    console.log(blog);
    res.render('post', {
      comment,
      blog,
      loggedInUser: req.session.user || null,
    })
  } else {
    res.redirect('/login');
    return;
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});


module.exports = router;