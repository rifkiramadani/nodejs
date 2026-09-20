import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`)
});

test("Test Query Parameter", async () => {
    const response = await request(app).get('/').query({firstName: "Rifky", lastName: "Ramadani"})
    expect(response.text).toBe("Hello Rifky Ramadani")
})