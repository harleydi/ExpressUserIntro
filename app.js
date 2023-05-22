const express = require('express')

const app = express()

app.use(express.json())

const PORT = 3000
const userList = require("./userData")


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


// GET some users
app.get("/some-users/:countryName", (req, res) => {
    const country = req.params.countryName
    const getUsersByCountry = userList.filter((user) => {
        return user.location.country.toLowerCase() === country.toLowerCase()
    })
    res.status(200).json({ data: getUsersByCountry })
})


// POST new user
app.post("/new-user", (req, res) => {
    const newUser = {
        gender: req.body.gender,
        name: {
            title: req.body.name.title,
            first: req.body.name.first,
            last: req.body.name.last,
        },
        location: {
            city: req.body.location.city,
            state: req.body.location.state,
            country: req.body.location.country,
            postcode: req.body.location.postcode,
        },
        email: req.body.email,
        phone: req.body.phone,
        cell: req.body.cell,
        nat: req.body.nat
    }

    let errorArr = []
    for (let key in newUser) {
        if (newUser[key] === '' || newUser[key] === undefined) {
            errorArr.push(`${key} cannot be empty`)
        }
    }
    if (errorArr.length > 0) {
        res.status(500).json({ error: true, message: errorArr })
    } else {
        userList.push(newUser)
    }
    res.status(200).json({ message: 'Success' })
})


app.put("/update-user/:userEmail", (req, res) => {
    const email = req.params.userEmail
    const findIndex = userList.findIndex((user) => user.email === email) // implicit return
    if (findIndex === -1) {
        return res.status(400).json({ success: false, message: "user not found" })
    }
    console.log(findIndex)
    const user = userList[findIndex]
    const updatedUser = { ...user }
    
    

    for (let key in req.body) {
        console.log(updatedUser)
        if (typeof req.body[key] === "object") {
            updatedUser[key] = {
                ...updatedUser[key],
                ...req.body[key]
            }
        } else {
            updatedUser[key] = req.body[key]
        }
    } 
    
    // Replacing the data
    userList.splice(findIndex, 1, updatedUser)
    
    res.status(200).json({ message: "success"})
})


app.delete("/delete-user/:phoneNumber", (req, res) => {
    const number = req.params.phoneNumber
    const findIndex = userList.findIndex((user) => user.phone === number)

    userList.splice(findIndex, 1)

    res.status(200).json({ data: "User Deleted" })
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})