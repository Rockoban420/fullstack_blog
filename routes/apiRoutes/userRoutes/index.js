const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../../models');

// POST /api/users

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const newUser = await User.create(userData);
    // this will allow us to save data into the req.session object
    // that data will persist throughout the length of the session or until a user logs out
    // or our server gets reset
    // Anything saved into this object will be accessible in any of our other routes
    req.session.save(() => {
      // saving a user property on the req.session object which is the user that was just created
      // this is important because we need to know who the logged-in user is when they're doing stuff
      req.session.user = newUser.get({plain: true});
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(500).json({error});
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      }
    });
    if (!userData) {
      return res.status(400).json({message: 'Incorrect username or password, please try again'});
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return res.status(400).json({message: 'Incorrect username or password, please try again'});
    }
    // this will allow us to save data into the req.session object
    // that data will persist throughout the length of the session or until a user logs out
    // or our server gets reset
    // Anything saved into this object will be accessible in any of our other routes
    req.session.save(() => {
      // saving a user property on the req.session object which is the user that was just created
      // this is important because we need to know who the logged-in user is when they're doing stuff
      req.session.user = userData.get({plain: true});
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {


  // this will destroy anything saved into req.session
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

/* if i had another route that calls req.session.save, we can store more stuff into it*/

module.exports = router;