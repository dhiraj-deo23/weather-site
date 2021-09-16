const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./src/utils/geocode");
const weather = require("./src/utils/weather");
const app = express();
const port = process.env.PORT || 3000;

//finding the path to static and partials
const publicDir = path.join(__dirname, "public");
const partialPath = path.join(__dirname, "views", "partials");

//setting handlebar templating engine
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dhiraj Deo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dhiraj Deo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some text!",
    name: "Dhiraj Deo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }
  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    let placeNew = data.place;
    weather(data.coord, (err, data) => {
      if (err) {
        if (err.code) {
          weather(placeNew, (err, data) => {
            if (err) {
              return res.send({
                error: err,
              });
            }
            if (err && err.code) {
              return res.send({
                error: err.info,
              });
            }
            res.send({
              location: placeNew,
              forecast: data,
            });
          });
        }
      } else {
        res.send({
          location: placeNew,
          forecast: data,
        });
      }
    });
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: 404,
    errorMessage: "Page Not Found",
    name: "Dhiraj Deo",
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
