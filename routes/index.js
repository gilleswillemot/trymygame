var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Hiscore = mongoose.model('Hiscore');
let jwt = require('express-jwt');

let auth = jwt({
  secret: SECRET, userProperty: 'payload'
});

// router.get('/API/hiscores/', function (req, res, next) {
//   Hiscore.find(function (err, hiscores) {
//     if (err) {
//       return next(err);
//     }
//     res.json(hiscores);
//   });
// });

// router.post('/API/hiscores/'/*, auth*/, function (req, res, next) {
//   //let hiscore = new Hiscore(req.body);
//   console.log(req.body);

//   let hiscore = new Hiscore(req.body);
//   hiscore.save(function (err, rec) {
//     if (err) {
//       return next(err);
//     }
//     res.json(rec);
//   })
// });

// router.param('hiscoreId', function (req, res, next, id) {
//   //the 'hiscoreId' should be used in get, delete and update methods of a single hiscore
//   //these get, delete and update methods should have :hiscoreId in their route url
//   console.log("in param method");
//   console.log(id);
//   let query = Hiscore.findById(id);//.populate('ingredients');
//   query.exec(function (err, hiscore) {
//     if (err) {
//       return next(err);
//     }
//     if (!hiscore) {
//       return next(new Error('not found ' + id));
//     }
//     req.hiscore = hiscore;
//     return next();
//   });
// });

// router.delete('/API/hiscore/:hiscoreId',/* auth,*/ function (req, res) {
//   console.log("in delete method");
//   // console.log(req.user.username);
//   // console.log(req.hiscore.username)
//   req.hiscore.remove(function (err) {
//     if (err) { return next(err); }
//     res.json(req.hiscore);
//   });
//   console.log(req.params.hiscoreId);
//   console.log(req.hiscore.id);
//   // Hiscore.findOneAndRemove({ _id: req.params.hiscoreId }, function (err, docs) {
//   //   if (err) { res.json(err); }
//   //   res.json(req.params.hiscoreId);
//   //   });
// });

// router.get('/API/hiscore/:hiscoreId', function (req, res) {
//   res.json(req.hiscore);
// });

// router.get('/API/bestHiscore/',/* auth,*/ function (req, res) {
//   console.log("Searching for best hiscore...");
//   console.log(req.user.payload);
//   // console.log(req.user); 
//   // console.log(req.session.user);
//   // console.log(req.session);
//   //console.log(req.user.payload);
//  // console.log(req.user);
//   let query = Hiscore
//     .findOne({ username: 'godmode'})
//     .sort('-score');

//   query.exec(function (err, hiscore) {
//     console.log("in query");
//     console.log(hiscore);
//     if (err) {
//       return next(err);
//     }
//     if (!hiscore) {
//       return next(new Error('not found ' + id));
//     }
//     res.json(hiscore);
//   });
// });


// router.update('/API/hiscore/:hiscoreId', function(req, res) {
//   req.hiscore.update(function (err) {
//     if (err) { return next(err); }
//     res.json(req.hiscore);
//   })
// });

module.exports = router;
