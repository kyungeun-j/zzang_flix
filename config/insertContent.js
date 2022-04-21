const mysql = require('mysql');
const fs = require('fs');
const db = require('./db');

fs.readFile('../mv.json', 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);
    
    const jsonData = JSON.parse(jsonFile);
    const values = []
    Object.keys(jsonData).forEach(genre => {
        Object.keys(jsonData[genre]).forEach(list => {
            const valueDetail = []
            valueDetail.push(list)
            Object.keys(jsonData[genre][list]).forEach(detail => {
            valueDetail.push(jsonData[genre][list][detail])
        })
        valueDetail.push(genre)
        values.push(valueDetail)
        })
    })

    const sql = 'INSERT INTO content VALUES ?';
    
    db.query(sql, [values], (err) => {
        if (err) throw console.log(err);
        db.end();
    });
});