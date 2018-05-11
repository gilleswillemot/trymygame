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
// var app = express();

let auth = jwt({
  secret: process.env.SECRET, userProperty: 'payload' /*requestProperty: 'payload'*/
});

router.post('/register', function (req, res, next) {
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  let user = new User(req.body);

  sendEmail(user.username, user.email);
  // user.creationDate = req.body.creationDate;
  // user.username = req.body.username;
  // user.birthday = req.body.birthday;
  // user.firstname = req.body.firstname;
  // user.username = req.body.username;
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
      // req.user = user;
      // console.log(user);
      // console.log(req.user);
      // req.session.user = user; //// It's Undefined
      console.log(req.session);
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
  console.log(req.body.password);
  console.log(req.user.username);
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
  console.log("in param method");
  console.log(username);
  // let query = User.find(username);//.populate('hiscores');
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
    console.log(req.user);
    console.log("found user, in param!");
    return next();
  });
});

//put
router.post('/update/:username', auth, function (req, res, next) {
  // const user = {
  //   email: req.body.email,
  //   firstname: req.body.firstname,
  //   surname: req.body.surname,
  //   birthday: req.body.birthday,
  //   username: req.body.username,
  //   //creationDate: req.body.creationDate,
  // };
  // console.log(user);
  let password = req.body.password;
  if (password) { //if password was changed
    console.log("password changed");
    req.user.setPassword(password);
    // User.update(req.user, function (err, raw) {
    //   if (err) {
    //     console.log("something went wrong when updating the user's password.");
    //     res.send(err);
    //   }
    //   console.log(raw);
    //   res.send(raw);
  };
  // user["password"] = req.body.password;
  // dialog box with 4 in it
  // alert(data.password);
  // alert(data["password"]);
  //  }

  // console.log(req.body);
  req.user.firstname = req.body.firstname;
  req.user.surname = req.body.surname;
  req.user.email = req.body.email;
  req.user.birthday = req.body.birthday;
  req.user.username = req.body.username;
  console.log(req.user);
  // let user = new User(req.body);
  req.user.save(function (err, rec) {
    if (err) return next(err);
    res.json(req.user);
  });
  // User.update(req.user, user, function (err, raw) {
  //   // console.log(req.user);
  //   // User.update(req.user, function (err, raw) {
  //   if (err) {
  //     console.log("something went wrong when updating the user");
  //     res.send(err);
  //   }
  //   console.log(raw);
  //   res.send(raw);
  // });
  // let user = new User(req.body);
  // req.user = user;
  // req.user.save(function (err, user) {
  //   if (err) return next(err);

  //   res.json(user);
  // });

  // req.user.update(function (err) {
  //   if (err) { return next(err); }
  //   res.json(req.user);
  // })
});

router.get('/user:username', auth, function (req, res, next) {
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

function sendEmail(/*req, res,*/ username, email) {
  let user2 = null;
  User.findOne({ 'username': "willemotgilles" }, function (err, user) { //kan dit wel in een simpelen function? Of moet er router.get
    //methode worden opgeroepen?
    if (!user) {
      console.log("user with username: " + username + " not found.");
    }
    console.log("user found in send email method");
    user2 = user;
    // res.json(user);
  });
  console.log(user2);
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: user2.email, // Your email id
      pass: user2.password // Your password
    }
  });
  var text = `${username} with email ${email} registrated to you game`// + req.body.name;
  var mailOptions = {
    from: user2.email, // sender address
    to: user2.email2, // list of receivers
    subject: `trymygame: ${username} with email ${email} registered to you game`, // Subject line
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

// router.post('/:userId/kleur', function (req, res) {
//   console.log(req.body.kleur);
//   Gebruiker.findByIdAndUpdate({ _id: req.params.userId },
//     { kleur: req.body.kleur }, function (err, doc) {
//       //if (err) return res.send(500, { error: err });
//       //return res.send("succesfully saved");
//     });
// });

module.exports = router;
