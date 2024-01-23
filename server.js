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

// Define the /getKunder GET route
app.get('/getKunder', (req, res) => {
    const query = 'SELECT * FROM Kunder';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching data from the database', error);
            return res.status(500).json({ message: 'Error fetching data from the database' });
        }
        res.json(results);
    });
});

// Define the /addKund POST route with automatic ID assignment
app.post('/addKund', (req, res) => {
    const { Kundnamn, Lonesystem, Team, Konsult } = req.body;

    // Fetch the maximum ID from the Kunder table
    const maxIDQuery = 'SELECT MAX(KundID) AS maxID FROM Kunder';

    connection.query(maxIDQuery, (maxIDError, maxIDResults) => {
        if (maxIDError) {
            console.error('Error fetching max ID from the database', maxIDError);
            return res.status(500).json({ message: 'Error fetching max ID from the database' });
        }

        // Calculate the next available ID
        const nextAvailableID = maxIDResults[0].maxID !== null ? maxIDResults[0].maxID + 1 : 1;

        // Insert the new client with the next available ID
        const insertQuery = 'INSERT INTO Kunder (KundID, Kundnamn, Lonesystem, Team, Konsult) VALUES (?, ?, ?, ?, ?)';

        connection.query(insertQuery, [nextAvailableID, Kundnamn, Lonesystem, Team, Konsult], (error, insertResults) => {
            if (error) {
                console.error('Error in database operation', error);
                return res.status(500).json({ message: 'Error adding data to the database' });
            }

            res.json({ message: 'Data inserted successfully', insertedId: nextAvailableID });
        });
    });
});


// Define the /updateKund PUT route
app.put('/updateKund/:id', (req, res) => {
    const { id } = req.params;
    const { Kundnamn, Lonesystem, Team, Konsult } = req.body;

    const query = 'UPDATE Kunder SET Kundnamn = ?, Lonesystem = ?, Team = ?, Konsult = ? WHERE KundID = ?';

    connection.query(query, [Kundnamn, Lonesystem, Team, Konsult, id], (error, results) => {
        if (error) {
            console.error('Error updating data in the database', error);
            return res.status(500).json({ message: 'Error updating data in the database' });
        }
        res.json({ message: 'Data updated successfully' });
    });
});

// Define the /deleteKund DELETE route
app.delete('/deleteKund/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Kunder WHERE KundID = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error deleting data from the database', error);
            return res.status(500).json({ message: 'Error deleting data from the database' });
        }
        res.json({ message: 'Data deleted successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
