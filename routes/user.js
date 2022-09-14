const express = require('express');
const fs = require('fs')

const DBPath = require("path");
const { bulkUpdate } = require('../controllers/controllers');
const { writeData } = require('../handleData/writeData');
const path = DBPath.dirname(__dirname).concat("/databse/userData.json");
const users = JSON.parse(fs.readFileSync(path))


const userRoutes = express.Router();

userRoutes
    .get('/random', (req, res) => {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        res.send(randomUser)
    })

    .get('/all', (req, res) => {
        const limitUsers = (limit = 0) => {
            if (limit > 0) {
                return users.slice(0, limit)
            }
            else {
                return users;
            }
        }
        const { limit } = req.query;
        const allUser = limitUsers(limit);
        res.send(allUser)
    })
    .post('/save', (req, res) => {
        const newData = req.body;
        const { gender, name, contact, address, photoUrl } = newData;

        if (gender && name && contact && address && photoUrl) {
            const userId = Number(users.length) + 1;
            const newUser = { id: userId, gender, name, contact, address, photoUrl }
            let abc = [...users, newUser]
            writeData(abc)
            res.send(newUser)
        } else {
            res.send(`please add the followings properly: gender,name,contact,address,photoUrl`)
        }

    })
    .patch('/update/:id', (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const result = bulkUpdate(id, data)
        res.send(result)
    })
    .patch('/bulk-update', (req, res) => {
        const body = req.body;
        body.forEach(data => {
            const id = data.id;
            bulkUpdate(id, data)
        })
        res.send('user updated')
    })
    .delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        const targetedUser = users.find(user => user.id === Number(id))

        if (targetedUser) {
            const otherUsers = users.filter(user => user.id !== Number(id))
            writeData(otherUsers);
            res.send(`user deleted with id ${id}`)
        }
        else {
            res.send("No users match with your given id")
        }
    })




module.exports = userRoutes;