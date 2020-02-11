const express = require('express');
const formData = require('express-form-data');
const client = require('./elasticsearch/connection');
const path = require('path');
require('dotenv').config()

//Import Routes Here
const data = require('./routes/api/data')
const totals = require('./routes/api/data2')

const app = express(); 

client.ping({
  requestTimeout: 30000,
}, function(error) {
  if (error) {
      console.error('elasticsearch cluster is down!');
  } else {
      console.log('Elasticsearch is connected');
  }
});
 
// Init Middleware
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse())

   
//Define Routes
app.use('/api/data', data);
app.use('/api/data', totals);

 
//Serve Static assets in production
//Configuration for Express to behave correctly in production environment
if (process.env.NODE_ENV === 'production') {
    //First - Making sure express will serve production assets - main.js, main.css, etc
    app.use(express.static('client/build'));
    //Second -Express will serve up the index.html file if it doesn't recognize the route
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};
 
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.group(`  Server Started On ${PORT}`));