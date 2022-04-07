var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.json());
users = []
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.static('static'))

app.post("/login", function (req, res) {
    if (users.length < 2) {
        let response = {
            getPlace: true,
            nick: req.body.obj,
            number: users.length
        }
        let check = true
        for (i in users) {
            if (users[i] == req.body.obj) {
                response = {
                    getPlace: false,
                    message: "Invalid nick"
                }
                check = false
            }
        }
        if (check)
            users.push(req.body.obj)
        res.send(JSON.stringify(response))
    } else {
        let response = {
            getPlace: false,
            message: "There are two players right now"
        }
        res.send(JSON.stringify(response))
    }
})
app.post("/players", function (req, res) {
    if (users.length == 2) res.send(true)
    else res.send(false)
})