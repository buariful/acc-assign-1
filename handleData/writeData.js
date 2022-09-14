// const express = require('express');
const fs = require('fs')

const DBPath = require("path");
const path = DBPath.dirname(__dirname).concat("/databse/userData.json");
// const users = JSON.parse(fs.readFileSync(path))

module.exports.writeData = (abc) => {
    // console.log(abc)
    fs.writeFileSync(path, JSON.stringify(abc));
}