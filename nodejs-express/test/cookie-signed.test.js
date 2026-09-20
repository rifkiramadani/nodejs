import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.signedCookies['Login'];
    // console.info(name);
    res.send(`Hello ${name}`)
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, {path: "/", signed: true});
    res.send(`Hello ${name}`)
})

test("Test Cookie Read", async () => {
    const response = await request(app).get('/')
        .set("Cookie", "Login=s%3Arifky.JBCrQoBZ8MhYYTz2q3hPvgrXYJNVG34fOoSP1v%2B%2FPPg; Path=/")
    expect(response.text).toBe("Hello rifky")
})

test("Test Cookie Write", async () => {
    const response = await request(app).post('/login')
        .send({name: "rifky"})
    // console.info(response.get(("Set-Cookie")))
    expect(response.get("Set-Cookie").toString()).toContain("rifky")
    expect(response.text).toBe("Hello rifky")
})