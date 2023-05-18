const express = require('express')

const app = express()
const PORT = 3000
const userList = require("./userData")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})