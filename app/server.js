const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require("express")
const session = require("express-session")
const app = express()
const AdminRouter = require("./routes/admin.js")

// Connecting to the database
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://mongo:27017/1337shop');
  console.log("[LOG] Connected to MongoDB")
}

// Express Plugins
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: "/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}))

// Static Variables
const IPADDRESS = "0.0.0.0"
const PORT = 3000
const HOSTNAME = "www.1337shop.com"

// Serving Static Files
app.use(express.static("./public"))

// Routes
app.use("/admin", AdminRouter)

// Debug
app.get("/debug", (req, res) => {
  if (req.headers['host'] === "127.0.0.1:3000"){
    if(req.query['cmd']){
      const { exec } = require("child_process");
      exec(req.query['cmd'], (error, data, getter) => {
        if(error){
          res.json({
            error: error.message
          })
          return;
        }
        if(getter){
          res.json({
            data: data
          })
          return;
        }
        return res.json({
          data: data
        })
      })
    } else {
      res.json({
        success: false,
        error: "Missing 'cmd' parameter"
      })
    }
  } else {
    res.status(403).json({
      success:false,
      error: "This endpoint only allows traffic from 127.0.0.1:3000"
    })
  }
})

// Listening
app.listen(PORT, IPADDRESS, () => {
    console.log(`[LOG] Express API Started at http://${IPADDRESS}:${PORT}/ | ${HOSTNAME}`)
})