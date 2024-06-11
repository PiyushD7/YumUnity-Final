const mongoose = require('mongoose');
const error = require('mongoose/lib/error');
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const mongo = () => mongoose.connect('mongodb+srv://cultgreekgods:InRpMCLGEQP0iP7l@cluster0.1uwekrl.mongodb.net/Recipes?retryWrites=true&w=majority')

.then(() => {
    console.log("MongoDB Connected...");


})

.catch((error) => {
    console.log(error)
})

module.exports = mongo
    // const db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function(){
    //   console.log('Connected')
    // });

// Models
require('./Category');
require('./Recipe');