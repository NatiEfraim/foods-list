// import library json web token
// down load webtoken for to create for user
const jWebToken = require("jsonwebtoken"); ///npm i jsonwebtoken
// create the function of checkin the token
exports.authToken = async (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "you must send token!!!" });
  }
  // now we vrefied of the token is valid for users!
  try {
    // collect the token!!!
    let decodeToken = jWebToken.verify(token, "MONKEYSSECRETE");
    // add to the pointer of req.tokenData
    req.tokenData=decodeToken;
    // affter we got his token --> nexto to the other function
    next();///--> go on 
    // let user = await UserModel.findOne({ _id: decodeToken._id }, { pass: 0 });
    // // res.json({msg:"got your token"})
    // res.json(user);
  } catch (error) {
    res.status(401).json({msg:"somting is worng with your token!!!"});
    res.status(400).send(error);
    return;
  }
};
