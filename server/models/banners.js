const mongoose = require ('mongoose')

let bannerSchema = new mongoose.Schema({
    logo: { type: String }, // Matches 'logo' field in JSON
    home: {
        home1: { type: String }, // Matches 'home1' field in 'home'
        home2: { type: String }, // Matches 'home2' field in 'home'
        home3: { type: String }, // Matches 'home3' field in 'home'
        home4: { type: String }  // Matches 'home4' field in 'home'
    },
    newItem: { type: String }, // Matches 'newItem' field in JSON
    best: { type: String }, // Matches 'best' field in JSON
    explore: { type: String } // Matches 'explore' field in JSON

})

// Model Name: 'Banner' 
// Collection Name: 'banners'
module.exports = mongoose.model('Banner', bannerSchema);
