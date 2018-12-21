const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

// app.use((req, res, next) => {
//   res.render("maintanence.hbs");
// });

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //   res.send("<h1>Hello Express!</h1>");

  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage:
      "Welcome to the home page, this is my test page to learn how to use NodeJS; although I dont want to use it for front end but I have to continue with the tutorial.... bllllkkkhhhhh"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/BAD", (req, res) => {
  //res.send("<h1>BAD REQUEST 404. Please go to /about</h1>");
  res.send({
    errorMessage: "Unable to Handle Request"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
