const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'zzang',
    password: '1234',
    database: 'zzangflix'
});

module.exports = db;