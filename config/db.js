const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'q3jdrtwjmq3njzfs',
    password: 'ktqwpzp5y7pjghk1',
    database: 'ak0lj64ytq9sg6ld'
});

db.connect();

module.exports = db;