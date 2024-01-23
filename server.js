const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Set up your MySQL connection
const connection = mysql.createConnection({
    host: 'ecit-kunder.chekue84cr7p.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'S3ogadus',
    database: 'uppstarter'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// Define a simple GET route
app.get('/', (req, res) => {
    res.send('Hello World from Server!');
});

// Define the /addKund POST route
app.post('/addKund', (req, res) => {
    const { Kundnamn, Lonesystem, Team, Konsult } = req.body;
    const query = `INSERT INTO Kunder (Kundnamn, Lonesystem, Team, Konsult) VALUES (?, ?, ?, ?)`;

    connection.query(query, [Kundnamn, Lonesystem, Team, Konsult], (error, results) => {
        if (error) {
            console.error('Error in database operation', error);
            return res.status(500).json({ message: 'Error adding data to the database' });
        }
        res.json({ message: 'Data inserted successfully', insertedId: results.insertId });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
