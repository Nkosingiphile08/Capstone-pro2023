const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

// Close the database connection when the Node.js process is terminated
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database closed.');
    }
    process.exit(0);
  });
});

const tableName = 'users';
// const tableName = 'appointments';

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    contacts TEXT,
    appointments TEXT,
    password TEXT 
  )
`, (err) => {  
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log(`Table '${tableName}' created or already exists.`);
  }
})

  db.on('error', (err) => {
    console.error('Database error:', err.message);
  });

  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database closed.');
    }
  }); 

const app = express()

const profileRouter = require("./routes/profile")

app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: false}))
app.use("/" , profileRouter)
app.listen(3000)

app.get("/", (req, res) => {
    res.render("index")
})

module.exports = db