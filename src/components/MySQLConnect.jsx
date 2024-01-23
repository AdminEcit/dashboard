// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Set up your MySQL connection
const connection = mysql.createConnection({
    host: 'ecit-kunder.chekue84cr7p.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'S3ogadus',
    database: 'uppstarter'
});

app.post('/addKund', (req, res) => {
    const { kundnamn, lonesystem, team, konsult } = req.body;
    const query = `INSERT INTO Kunder (Kundnamn, Lonesystem, Team, Konsult) VALUES (?, ?, ?, ?)`;

    connection.query(query, [kundnamn, lonesystem, team, konsult], (error, results) => {
        if (error) throw error;
        res.send({ message: 'Data inserted successfully', data: results });
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
