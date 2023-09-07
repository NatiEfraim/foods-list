// sechma of the user there are in the mongo db
// mast to fit to the name of key 
// connect to mongoose 
const mongoose=require("mongoose");////npm i monggose - for connecting to mongodb
// for validation require joi
const Joi=require("joi");////npm i joi - for validation
// down load webtoken for to create for user
const jWebToken=require("jsonwebtoken");///npm i jsonwebtoken
// create sechma: - each user must have key.
const UserSechma=new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    role:{
        // diffine of deffult
        type:String,default:"regular"
    },
    date_created:{
        // diffine the date
        type:Date,default:Date.now()
    }
});
// export the user out 
exports.UserModel=mongoose.model("users",UserSechma);
// const UserModle=mongoose.model("users",UserSechma);
// exports.UserModel=UserModle;

// function for webToken
exports.genToken=(_userID)=>{
    // create token for id users - _id,str,valid
    let token=jWebToken.sign(
        {_id:_userID},
        "MONKEYSSECRETE",
        {expiresIn:"60min"}
    )
    return token;///user has token on his own
}




// function of valid - params - befor we get to mongo data
exports.validUser=(_bodyData)=>{
    let joiSechma=Joi.object({
        // what is must and how it should be
        name:Joi.string().min(2).max(20).required(),
        email:Joi.string().min(2).max(299).required().email(),
        pass:Joi.string().min(3).max(999).required(),
    })
    return joiSechma.validate(_bodyData);
}
// function of valid - for login - for user to get token
exports.validLogin=(_bodyData)=>{
    let joiSechma=Joi.object({
        // check the email user and the pass
        email:Joi.string().min(2).max(299).required().email(),
        pass:Joi.string().min(3).max(999).required(),
    })
    return joiSechma.validate(_bodyData);
}