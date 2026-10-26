// const express = require('express');
import express from "express";
import usersRouter from "./routes/users.route.js";
import restaurantsRouter from "./routes/restaurants.route.js";
import menusRouter from "./routes/menus.route.js";

const app = express()
const port = 3000

app.use(express.json());

app.use("/users", usersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/menus", menusRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/a', (req, res) => {
    res.send('a');
})

app.get('/b', (req, res) => {
    res.send('b')
})