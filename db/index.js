const mongoose = require('mongoose');

// Used for connecting to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI);

// Connects to the local instance of the database
mongoose.connect('mongodb://localhost/THSTAM');

module.exports = mongoose;
