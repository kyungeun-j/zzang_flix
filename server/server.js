const express = require('express')
const app  = express();
const PORT = process.env.PORT || 4000
const db = require('./config/db');

app.get('/api/content', (req, res) => {
  db.query("SELECT * FROM content", (err, data) => {
    if(!err) res.send({ content: data });
    else res.send(err);
  })
})

app.get('/react', (req, res) => {
  res.send({ react: 'react start'})
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`)
})