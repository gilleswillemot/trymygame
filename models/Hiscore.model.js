let mongoose = require('mongoose');
  
let HiscoreSchema = new mongoose.Schema({
  // score: Number,
  timer: Number,
  numberOfRounds: Number,
  kills: Number, 
  username: String,
  date: { type: Date, default: Date.now }, 
});	
 //updated: { type: Date, default: Date.now },
//  age:     { type: Number, min: 18, max: 65 },

mongoose.model('Hiscore', HiscoreSchema);
//mongoose.model.apply('Hiscore', HiscoreSchema);