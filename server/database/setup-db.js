const fs = require('fs')
require('dotenv').config()

const db = require("./connect")

const sql = fs.readFileSync('./database/data.sql').toString()

db.query(sql)
    .then(data => {
        db.end()
        console.log("Set-up complete!")
    })
    .catch(error => console.log(error))

    