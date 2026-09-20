import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    res.redirect('/to-next-page')
    // res.redirect(301, '/to-next-page') //default 302
    // res.redirect('www.google.com')
});

test("Test Response", async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(302);
    expect(response.get("Location")).toBe('/to-next-page')
})