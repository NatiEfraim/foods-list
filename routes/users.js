// users router
// diffine express and router
const exprees = require("express");
const bcrypt = require("bcrypt"); ///npm i bcrypt
// down load webtoken for to create for user
const jWebToken=require("jsonwebtoken");///npm i jsonwebtoken
// get the UserModle
const {
  UserModel,
  validUser,
  validLogin,
  genToken,
} = require("../models/userModel");
// imoirt the auth file
const {authToken}=require("../auth/authToken");
// diffine the router of all kind of the req
const router = exprees.Router();
// get all users in collections
router.get("/", async (req, res) => {
  // what return on format of json
  // doing request "api"
  let data = await UserModel.find({}); ///find all data in collection
  // what return on format of json
  res.json(data);
  //   res.json({ msg: "exspress useurs work" });
});
// useing the token for user -> to show his metirials
// befor doing the function go token checking!
router.get("/userinfo",authToken, async(req,res)=>{

        // if the function of authToken seccseed --> has token
        let user=await UserModel.findOne({_id:req.tokenData._id},{pass:0});
        res.json(user);

        // // res.json({msg:"got your token"})
        // res.json({msg:"we got your token from middleware all good"});



        // all what in here is in the function of authtoken
        // at first sheck the token
        // let token=req.header("x-api-key");
        // if (!token) {
        //   return res.status(401).json({msg:"you must send token!!!"});
        // }
        // now we vrefied of the token is valid for users!
        // try {
        //         // collec the token!!!
        //         let decodeToken=jWebToken.verify(token,"MONKEYSSECRETE");
        //         let user=await UserModel.findOne({_id:decodeToken._id},{pass:0});
        //         // res.json({msg:"got your token"})
        //         res.json(user);

        // } catch (error) {
        //         // res.status(401).json({msg:"somting is worng with your token!!!"});
        //          res.status(400).send(error);
        //          return

        // }
})

// post req - add new user to mongo data
router.post("/", async (req, res) => {
  // req.body - all data. from user
  //   befor we turn for asking the data - we valid the user details
  let validBodyData = validUser(req.body);
  if (validBodyData.error) {
    // has been error
    return res.status(400).json(validBodyData.error.details);
  }
  // neew to check the email - it must be uniqk
  try {
    //show me hat you get from postman
    //   res.json(req.body);
    // need to crypt the pass befor then
    let newUser = new UserModel(req.body); ///complete all data into new user

    // what return on format of json
    // res.json(data);
    newUser.pass = await bcrypt.hash(newUser.pass, 10); ///enpcrpt the pass - level 10
    await newUser.save(); //save all date you got in mongo db
    newUser.pass = "*****"; ///hide the crpyt from all
    res.json(newUser); ///add to mongoDB - exprees0 - collections - foods
  } catch (error) {
    // console.log(error);
    res.status(400).send(error);
    // res.status(400).json({error:"email is allready in database!!!"})
  }
});
// req for login of user - pose req
router.post("/login", async (req, res) => {
  // need to wuse on validLogin
  //  befor we turn for asking the data - we valid the user details
  let validBodyData = validLogin(req.body);
  if (validBodyData.error) {
    // has been error
    return res.status(400).json(validBodyData.error.details);
  }
  //   at first check hus email in the mongo db in users collections.
  let user = await UserModel.findOne({ email: req.body.email });
//   user contain all details of the obj from mongo db
  if (!user) {
    // email has not found
    return res.status(401).json({ msg: "email has not found!!!" });
  }
  //then we verfide the crypt of the pass with the crypt that in the database
  let passValid = await bcrypt.compare(req.body.pass, user.pass); ///verfied the pass
  if (!passValid) {
    // email has not found
    return res.status(401).json({ msg: "password is wrong!!!" });
  }
  //   at the end return OK -and send token
  let newToken = genToken(user._id);
  res.json({token:newToken});///send the user his own token

});
module.exports = router;
