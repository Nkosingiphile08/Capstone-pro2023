const express = require("express")

const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');


// app.use(express.static('views')); 


// router.get('/index', (req, res) => {
//     res.render('index'); // Assuming your template file is in a "views" directory
//   });
  
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

router.get("/BPtracking", function(req,res) {
res.render("bptracking")
})

router.get("/about", function(req,res) {
    res.render("about")
    })

router.get("/bmi", function(req,res) {
    res.render('bmi')
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

module.exports = router
