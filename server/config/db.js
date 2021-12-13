const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'zzang',
    password: '1234',
    database: 'zzangflix'
});

db.connect();

module.exports = db;