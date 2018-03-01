let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

router.post('/register', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
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

router.post('/checkusername', function(req, res, next) {
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      res.json({ username: 'alreadyexists' });
    } else {
      res.json({ username: 'ok' });
    }
  });
});

// router.get('/:userId', function (req, res, next) {
//   Gebruiker.findById(req.params.userId, function (err, user) {
//     if (err) return next(err);
//     if (!user)
//       return next(new Error('not found ' + req.params.userId));
//     res.json(user);
//   });
// });

// router.get('/email/:email', function (req, res, next) {
//   Gebruiker.findOne({ 'username': req.params.email }, function (err, user) {
//     if (err) return next(err);
//     //if (!user)
//     //  return next(new Error('not found ' + req.params.email));
//     res.json(user);
//   });
// });

// router.post('/:userId/kleur', function (req, res) {
//   console.log(req.body.kleur);
//   Gebruiker.findByIdAndUpdate({ _id: req.params.userId },
//     { kleur: req.body.kleur }, function (err, doc) {
//       //if (err) return res.send(500, { error: err });
//       //return res.send("succesfully saved");
//     });
//   //Gebruiker.findById(req.params.userId, function (err, gebruiker) {
//   //  if (err) { return next(err) };
//   //  gebruiker.kleur = req.params.kleur;
//   //  gebruiker.save(function (err) {
//   //    if (err) { return next(err); }
//   //  });
// });

module.exports = router;
