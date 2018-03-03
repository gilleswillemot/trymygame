let mongoose = require('mongoose');
  
let HiscoreSchema = new mongoose.Schema({
  score: Number,
  numberOfRounds: Number,
  kills: Number, 
  username: String,
  date: Date 
});	
 //updated: { type: Date, default: Date.now },
//  age:     { type: Number, min: 18, max: 65 },

mongoose.model('Hiscore', HiscoreSchema);
//mongoose.model.apply('Hiscore', HiscoreSchema);