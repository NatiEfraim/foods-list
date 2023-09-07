
// import all route 
const indexRouter=require("./index");
const usersRouter=require("./users");
const shopRouter=require("./shop");
const foodRouter=require("./foods");

exports.routesInit=(app)=>{
// diffine the home page show - route (req,res)
// req route from index
app.use("/",indexRouter);//go to router index.
// req for mongo db - express0 - collection:users
app.use("/users",usersRouter);///go to users router
// req for shop data
app.use("/shop",shopRouter);///go to shop router
// req for mongo db - express0 - collection:foods
app.use("/foods",foodRouter);///go to foods router

}