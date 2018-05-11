let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');
let jwt = require('express-jwt');
var nodemailer = require('nodemailer');
// var router = express.Router();
// app.use('/sayHello', router);
// router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

let auth = jwt({
  secret: process.env.SECRET, userProperty: 'payload' /*requestProperty: 'payload'*/
});

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  let user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  User.find({ username: req.body.username }, function (err, result) {
    if (result.length) {
      res.json({ username: 'alreadyexists' });
    } else {
      res.json({ username: 'ok' });
    }
  });
});

router.post('/checkemail', function (req, res, next) {
  User.find({ email: req.body.email }, function (err, result) {
    if (result.length) {
      res.json({ email: 'alreadyexists' });
    } else {
      res.json({ email: 'ok' });
    }
  });
});

router.post('/checkpassword/:username', auth, function (req, res, next) {
  let salt = req.user.salt;
  let hash = req.user.hash;
  if (req.user.validPassword(req.body.password)) {
    res.json({ email: 'ok' });
  } else {
    res.json({ email: 'wrongpassword' });
  }
});

router.param('username', function (req, res, next, username) {
  //the 'hiscoreId' should be used in get, delete and update methods of a single hiscore
  //these get, delete and update methods should have :hiscoreId in their route url
  let query = User.findOne({ 'username': username });
  query.exec(function (err, user) {
    if (err) {
      console.log("error querying username");
      return next(err);
    }
    if (!user) {
      return next(new Error('not found ' + username));
    }
    req.user = user;
    return next();
  });
});

//put
router.post('/update/:username', auth, function (req, res, next) {
  let password = req.body.password;
  if (password) { //if password was changed
    console.log("password changed");
    req.user.setPassword(password);
  };
  req.user.firstname = req.body.firstname;
  req.user.surname = req.body.surname;
  req.user.email = req.body.email;
  req.user.birthday = req.body.birthday;
  req.user.username = req.body.username;
  req.user.save(function (err, rec) {
    if (err) return next(err);
    res.json(req.user);
  });
});

router.get('/user/:username', auth, function (req, res, next) {
  res.json(req.user);
});

router.get('/currentUser', auth, function (req, res, next) {
  let username = req.payload.username;
  User.findOne({ 'username': username }, function (err, user) {
    if (err) return next(err);
    if (!user)
      return next(new Error('User with username ' + username + " has not been found."));
    res.json(user);
  });
});

router.post('/sendEmail/:username', auth, function (req, res, next) {
  console.log("In sendemail method");
  if (req.user != null) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: req.user.email, // Your email id
        pass: req.user.password // Your password
      }
    });
    var text = `${req.body.username} with email ${req.body.email} registrated to you game`// + req.body.name;
    var mailOptions = {
      from: req.user.email, // sender address
      to: req.user.email2, // list of receivers
      subject: `trymygame: ${req.body.username} with email ${req.body.email} registered to you game`, // Subject line
      text: text //, // plaintext body
      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ yo: 'error' });
      } else {
        console.log('Message sent: ' + info.response);
        res.json({ yo: info.response });
      };
    });
  }
  else return res.status(400).json({ message: 'Could not send mail to site master, bot email user not found.' });
});

module.exports = router;
