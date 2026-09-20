import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/rifky', (req, res) => {
    res.send("Hello Rifky")
})

app.listen(3000, () => {
    console.info(`Server is running on port ${3000}`)
})