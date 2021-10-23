const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const app = express();

// Google auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "759198583986-sccn4qi5ej0ogndb7ktfk3m1858bu0td.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 5000;

// adding middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

//login from the user
app.post("/login", (req, res) => {
  let token = req.body.token;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log(payload);
  }
  verify()
    .then(() => {
      res.cookie("session-token", token);
      res.send("success");
    })
    .catch(console.error);
});

app.get("/logout", (req, res) => {
  res.clearCookie("session-token");
  res.redirect("/login");
});

app.get("/app", checkAuthenticated, (req, res) => {
  let user = req.user;
  res.sendFile(path.join(__dirname, "public", "app.html"));
});

function checkAuthenticated(req, res, next) {
  let token = req.cookies["session-token"];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.redirect("/login");
    });
}

app.listen(PORT, () => {
  console.log(`The server is being hosted on port ${PORT}`);
});
