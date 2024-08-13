const mongoose = require('mongoose');
const uri = "mongodb+srv://Jayachitra:YouWillWin2023@cluster0.m3r2e.mongodb.net/CafeProject?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
  const cafes  = db.db.collection("cafes");
  cafes.find({}).toArray(function(err, data){
      console.log(data); // it will print your collection data
  });
});