const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.send("hello world")
});


app.listen(port , function(){
    console.log(`example app listening at http://localhost:${port}`);
})











 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 