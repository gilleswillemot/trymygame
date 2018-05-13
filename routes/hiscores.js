var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Hiscore = mongoose.model('Hiscore');
let jwt = require('express-jwt');

let auth = jwt({
  secret: process.env.SECRET, userProperty: 'payload' /*requestProperty: 'payload'*/
});

router.get('/', function (req, res, next) {
  Hiscore.find(function (err, hiscores) {
    if (err) {
      return next(err);
    }
    res.json(hiscores);
  });
});

router.post('/new/', auth, function (req, res, next) {
  //let hiscore = new Hiscore(req.body);
  console.log(req.body);

  let hiscore = new Hiscore(req.body);
  hiscore.save(function (err, rec) {
    if (err) {
      return next(err);
    }
    res.json(rec);
  })
});

router.param('hiscoreId', function (req, res, next, id) {
  //the 'hiscoreId' should be used in get, delete and update methods of a single hiscore
  //these get, delete and update methods should have :hiscoreId in their route url
  console.log("in param method");
  console.log(id);
  let query = Hiscore.findById(id);//.populate('ingredients');
  query.exec(function (err, hiscore) {
    if (err) {
      return next(err);
    }
    if (!hiscore) {
      return next(new Error('not found ' + id));
    }
    req.hiscore = hiscore;
    return next();
  });
});

router.delete('/delete/:hiscoreId', auth, function (req, res, next) {
  console.log("in delete method");
  // console.log(req.user.username);
  // console.log(req.hiscore.username)
  let hiscoreUsername = req.hiscore.username;
  let username = req.payload.username;
  if (username == hiscoreUsername) {
    req.hiscore.remove(function (err) {
      if (err) { return next(err); }
      res.json(req.hiscore);
    });
  }
  else return next(new Error("You tried to delete the hiscore of " + hiscoreUsername +
    ", to which you have no right to."));
  // Hiscore.findOneAndRemove({ _id: req.params.hiscoreId }, function (err, docs) {
  //   if (err) { res.json(err); }
  //   res.json(req.params.hiscoreId);
  //   });
});

router.get('/hiscore/:hiscoreId', function (req, res) {
  res.json(req.hiscore);
});

/**
 * 304 response = frontend best hiscore = nieuwe response, dus geen verandering. (Not Modified.)
 */
router.get('/bestHiscore/', auth, function (req, res, next/*, id*/) {
  console.log("Searching for best hiscore...");
  console.log(req.payload);
  let username = req.payload.username;
  //console.log(auth);
  let query = Hiscore
    .findOne({ username: username })
    .sort('-kills').sort('-numberOfRounds').sort('+timer');

  query.exec(function (err, hiscore) {
    console.log("in query");
    console.log(hiscore);
    if (err) {
      return next(err);
    }
    if (!hiscore) {
      return next(new Error('You have no hiscores yet.'));
    }
    res.json(hiscore);
  });
});


// router.update('/API/hiscore/:hiscoreId', function(req, res) {
//   req.hiscore.update(function (err) {
//     if (err) { return next(err); }
//     res.json(req.hiscore);
//   })
// });

module.exports = router;
