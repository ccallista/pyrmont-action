const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const newsModel = require('./news/newsModel');
const newsRoutes = require('./news/newsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// creates our database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database.");
});

// Create 'users' table if it doesn't exist

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    mobilePhone VARCHAR(15) NOT NULL,
    areaOfInterest TEXT NOT NULL,
    streetName VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(3) NOT NULL,
    postcode VARCHAR(4) NOT NULL
  );

`);

const userRouter = require('./user/userRoutes')
app.use("", function(req, res, next) {
  req.db = db;
  next();
},
userRouter);


newsModel(db);

app.use('/api/news', newsRoutes(db));

// // GET all users
// app.get('/api/users', (req, res) => {
//   db.all('SELECT * FROM users', [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// // POST add new user
// app.post('/api/users', (req, res) => {
//   const { username } = req.body;
//   if (!username) {
//     return res.status(400).json({ error: 'Username is required.' });
//   }
//   db.run('INSERT INTO users (username) VALUES (?)', [username], function (err) {
//     if (err) return res.status(500).json({ error: err.message });
//     // 'this.lastID' is the newly inserted row ID
//     res.json({ id: this.lastID, username });
//   });
// });

// // DELETE user
// app.delete('/api/users/:id', (req, res) => {
//   const userId = req.params.id;
//   db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
//     if (err) return res.status(500).json({ error: err.message });
//     if (this.changes === 0) {
//       return res.status(404).json({ error: 'User not found.' });
//     }
//     res.json({ message: 'User deleted successfully.' });
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
