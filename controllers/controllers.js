const express = require('express');
const fs = require('fs')

const DBPath = require("path");
const { writeData } = require('../handleData/writeData');
const path = DBPath.dirname(__dirname).concat("/databse/userData.json");
const users = JSON.parse(fs.readFileSync(path))

module.exports.bulkUpdate = (id, data) => {
    const targetedUser = users.find(user => user.id === Number(id))

    if (targetedUser) {
        const otherUsers = users.filter(user => user.id !== Number(id))
        targetedUser.gender = data.gender;
        targetedUser.name = data.name;
        targetedUser.contact = data.contact;
        targetedUser.address = data.address;
        targetedUser.photoUrl = data.photoUrl;

        otherUsers.push(targetedUser);
        writeData(otherUsers);
        return (targetedUser)
    }
    else {
        return ("No users match with your given id")
    }
}