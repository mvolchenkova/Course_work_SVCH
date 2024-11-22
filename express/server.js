const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 5000;

const client = new Client({
    user: 'postgres',
    password: '315101315',
    host: 'localhost',
    port: 5432,
    database: 'Gymside',
});

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // Execute your query here
        return client.query('SELECT * FROM public."Authenticate"');
    })
    .then(result => {
        console.log('Query result:', result.rows);
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Setup routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Ensure the connection is closed when the application ends
process.on('SIGINT', () => {
    client.end()
        .then(() => {
            console.log('Connection to PostgreSQL closed');
            process.exit();
        })
        .catch(err => {
            console.error('Error closing connection', err);
            process.exit(1);
        });
});