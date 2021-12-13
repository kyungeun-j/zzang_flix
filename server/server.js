const express = require('express');
const app  = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/content', (req, res) => {
  db.query("SELECT * FROM content", (err, data) => {
    if(!err) res.send({ content: data });
    else res.send(err);
  })
})

app.post('/api/user/compare_email', (req, res) => {
  db.query("SELECT * FROM user where email = ?", [[req.body.email]], (err, data) => {
    if (data.length === 0 || !err) {
      res.send({ compareResult: true });
    } else {
      res.send({ compareResult: false });
    }
  })
})

app.post('/api/user/register', (req, res) => {
  const user = [Object.values(req.body).map(body => body)];

  db.query("INSERT INTO user VALUES ?", [user] , (err) => {
    if (err) res.send({ registerSuccess: false});
    else res.send({ registerSuccess: true });
  }) 
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`)
})