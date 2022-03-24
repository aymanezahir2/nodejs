//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const schemas = require("./models/aricleSchema");
// for auto refresh
{
  const path = require("path");
  const livereload = require("livereload");
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));

  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}
// mongoose
{
  const mongoose = require("mongoose");

  mongoose
    .connect(
      "mongodb+srv://aymanezahir2:zahirhub2@cluster0.qpl87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then((result) => {
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

app.post("/all-articles", function (req, res) {
  const articles = new schemas(req.body);

  articles
  .save()
  .then(function(result){
    res.redirect("/all-articles")
  })
  .catch(function(err){
    console.log(err);
  })
});

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/all-articles", (req, res) => {
  res.render("index");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article");
});

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
