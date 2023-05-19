const express = require('express')

const app = express()
const PORT = 3000
const userList = require("./userData")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

// GET all users
app.get("/all-users", (req, res) => {
    return res.status(200).json({ data: userList })
})

// GET single-user
app.get("/single-user/:phoneNumber", (req, res) => {
    const number = req.params.phoneNumber
    const getUserByNumber = userList.filter((user) => {
        if (user.phone === number) {
            return user
        }
    })
    res.status(200).json({ data: getUserByNumber })
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})