const express = require("express")

const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');


router.use(express.static('public')); 

router.get("/login",  (req, res) => {
   res.render("login")
})
router.get("/signup",  (req, res) => {
   res.render("signup")
})
router.get("/appointment",  (req, res) => {
    let doctors = [
        { name: 'Dr One', address: '453 Doctor\'s street, Dr Town, Durban', phone: '031 245 7658' },
        { name: 'Dr Two', address: '453 Doctor Ave, Dr City, Johannesburg', phone: '011 245 7658' },
        { name: 'Dr Three', address: '453 DR lane, Doctorsburg, Cape Town', phone: '021 245 7658' },

    ]
   res.render("appointment", {doctors: doctors})
})

router.get("/community-support", function (req,res) {
 res.render("community")
})

router.get("/bp-tracking", function (req,res) {
res.render("bp-tracking")
})

router.get("/about", function (req,res) {
    res.render("about")
    })

router.get("/bmi", function (req,res) {
    res.render('bmi')
  })

router.get("/languages", function (req,res) {
    res.render("languages")
  })
  
router.get("/index", function (req, res) {
    res.render("index")
  })
router.get("/nutrition", function (req, res) {
    res.render("nutrition")
  })
  router.get("/recommendations", function (req, res) {
    res.render("recommendations")
  })  
  router.get("/chat", function (req, res) {
    res.render("chat")
  })
// GET route to render the page with the form
router.get("/delete-null-form", function (req,res) {
    res.render('delete-null-form') 
  })

router.post("/login", (req, res) => {
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [req.body.email, req.body.password], (err, row) => {
        if (err) {
            res.render("login", {user: null})
        }
        if (row) {
          res.render("profile", {user: row})
        } else {
          res.render("login", {user: null})
        }
      });
})


router.post("/signup", (req, res) => {
    db.run(`INSERT INTO users (name, email, contacts, password) VALUES (?, ?, ?, ?)`, [req.body.name, req.body.email, req.body.contacts, req.body.password], err => {
        if(err){
            console.log(err.message)
            res.render("signup")
        }
        
        else{
           res.redirect("login")
        }
    })
})


router.post("/appointments", (req, res) => {
    const data = {
        time: req.body.time,
        date: req.body.date,
        doctor: req.body.doctor
    }

    const dataJSON = JSON.stringify(data)
    
    db.run(`UPDATE users SET appointments = ? WHERE email = ? `, [dataJSON, req.body.email], (err) => {
        if(err) {
            return console.error(err.message)
        }
        else {
            db.get(`SELECT * FROM users WHERE email = ? `, [req.body.email], (err, row) => {
                if (err) {
                    res.render("appointment")
                }
                if (row) {
                  res.render("profile", {user: row})
                } else {
                  res.render("appointment")
                }
              });
        }
    })
})

// POST route to handle the deletion request
router.post('/delete-null-records', (req, res) => {
    const columnName = 'appointments'; // Replace with the actual column name
    const tableName = 'users'; // Replace with the actual table name
    const sql = `DELETE FROM ${tableName} WHERE ${columnName} IS NULL`;
  
    db.run(sql, [], (err) => {
      if (err) {
        res.status(500).send('Error deleting records');
      } else {
        res.send('Records with NULL values deleted successfully');
      }
    });
  });
  
module.exports = router
