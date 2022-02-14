const express = require('express');
const app  = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const cors = require('cors');

// jwt
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// content
// content 리스트
app.get('/api/content', (req, res) => {
  db.query("SELECT * FROM content", (err, data) => {
    if(!err) res.send({ content: data });
    else res.send(err);
  })
})

// user
// user email 중복 확인
app.post('/api/user/compare_email', (req, res) => {
  db.query("SELECT * FROM user where email = ?", [[req.body.email]], (err, data) => {
    if (data.length > 0) {
      res.send({ compareResult: true });
    } else {
      res.send({ compareResult: false });
    }
  })
})

// register
app.post('/api/user/register', (req, res) => {
  const user = [Object.values(req.body).map(body => body)];

  db.query("INSERT INTO user VALUES ?", [user] , (err) => {
    console.log(err)
    if (err === null) res.send(true);
    else res.send(false);
  }) 
})

// login
app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body

  // email & password 확인
  db.query("SELECT * FROM user WHERE email = ?", email, (err, data) => {
    if (!err) {
      console.log(data)
      console.log(data.length)
      if (data.length < 1) {
        res.send({ result: false, msg: 'email fail' })
      } else {
        db.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], (err, data) => {
          console.log(data)
          if (data.length < 1) {
            res.send({ result: false, msg: 'password fail' })
          } else {
            // jwt 토큰 생성, pw는 보안때문에 넣지 않는 것이 좋음, 유효기간 1시간(임시)
            const accessToken = jwt.sign(
              {
                email
              },
              SECRET_KEY,
              {
                expiresIn: '1h',
              }
            );
            res.send({ result: true, userEmail: email, token: accessToken });
          }
        })
      }
    }
  })
})

// logout
app.post('/api/user/logout', (req, res) => {
    if (req.body.token == undefined) {
      res.send(true);
    } else {
      res.send(false);
    }
})

// login check
app.post('/api/user/loginCheck', (req, res) => {
  jwt.verify(req.body.token, SECRET_KEY, (error, decoded) => {
    if(error) res.send(false);
    else res.send(decoded.email);
  });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`)
})