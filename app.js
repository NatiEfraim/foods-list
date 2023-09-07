// diffine express
const express=require("express");
// diffine path
const path=require("path");
// diffine the http protocol
const http=require("http");
// using cors for alow other domein to get api
const cors=require("cors");///npm i cors
// diffine the connection of the mongo db
const mongoDB= require("./db/mongoConnect");
// import our config routes
const {routesInit}=require ("./routes/config_routes");
// diffine app -> exprees
const app=express();
// /////diffine of middle ware - all settings

// 1 - all exprss get --> json format
app.use(express.json());

// 2 - diffine static file - for client 
app.use(express.static(path.join(__dirname,"public")));
// ///using cors
app.use(cors());
routesInit(app);///send the app - to our route file

// diffine the server
const server=http.createServer(app);
// diffine port
let port =process.env.PORT|| "3000";
// listen to the port
server.listen(port);
