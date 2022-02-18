const { Route } = require("express")
const express = require("express")
const Router = express.Router()
const User = require("../models/User.js")
const PrevLoginLog = require("../models/PrevLoginLog.js")

// Auth check middleware
function checkAuth(req, res, nxt){
    if (req.session['admin']){
        nxt()
    } else {
        res.redirect("/admin/login")
    }
}

Router.get("/login", (req, res) => {
    const path = require("path")
    res.sendFile(path.resolve("./templates/login.html"))
})

Router.post("/login", async (req, res) => {
    try {
        // Checking if there is a user with valid username
        let user = await User.findOne({
            username: req.body.username
        })
        if (user){
            let authenticatedUser = await User.findOne({
                username: user.username,
                password: req.body.password
            })
            if (authenticatedUser){
                req.session['admin'] = authenticatedUser
                req.session['user-agent'] = req.headers['user-agent']
                
                try {
                    // Logging
                    // var date = new Date();
                    // Disable loggin temporarily
                    // const prevLoginLog = new PrevLoginLog({
                    //     time: `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`,
                    //     timestamp: Date.now(),
                    //     username: "undefined",
                    //     userAgent: req.headers['user-agent']
                    // });
                    // await prevLoginLog.save();
                } catch (err) {
                    console.error(err)
                }

                return res.json({
                    success: true
                })

            } else {
                return res.status(403).json({
                    success: false,
                    msg: "Incorrect Password"
                })
            }
        } else {
            return res.status(403).json({
                success: false,
                msg: "Incorrect Username"
            })
        }
    } catch (error) {
        res.status(500).end()
    }
    
})

// Get audit logs and PDF Generation
Router.get("/logs/prev-logins", checkAuth, async (req, res) => {

    // Checking if there is a `download` param in the query
    // If yes, converting the User agents to PDF
    if (req.query['download']){
        const recent100Logs = await PrevLoginLog.find().sort({timestamp: "desc"}).limit(100)
        const pug = require("pug")
        const path = require("path")
        const fs = require("fs")
        const wkhtmltopdf = require("wkhtmltopdf")
        var date = new Date();

        const compiledFunc = pug.compileFile(path.resolve("./templates/pug/prevLogs.pug"))
        const html = compiledFunc({
            logs: recent100Logs,
            httpUserAgent: req.session['user-agent'],
            cTime: `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`
        })

        return wkhtmltopdf(html).pipe(res);
    } else {
        const data = await PrevLoginLog.find().sort({timestamp: "desc"}).limit(15)
        res.json(data)
    }

})

Router.get("/", checkAuth, (req, res) => {
    const path = require("path")
    res.sendFile(path.resolve("./templates/admin.html"))
})








// -- Trash --
// 500 Status Pages :} too lazy to code
Router.get("/tasks", (req, res) => {
    const path = require("path")
    res.status(500).sendFile(path.resolve("./templates/s500.html"))
})

Router.get("/messages", (req, res) => {
    const path = require("path")
    res.status(500).sendFile(path.resolve("./templates/s500.html"))
})

Router.get("/payments", (req, res) => {
    const path = require("path")
    res.status(500).sendFile(path.resolve("./templates/s500.html"))
})

module.exports = Router