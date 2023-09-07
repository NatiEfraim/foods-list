// sechma of the product there are in the mongo db
// mast to fit to the name of key 
const mongoose=require("mongoose");////npm i monggose - for connecting to mongodb
// for validation require joi
const Joi=require("joi");////npm i joi - for validation
// create sechma: - each prod must have key.
const FoodSechma=new mongoose.Schema({
    name:String,
    img:String,
    cal:Number,
    price:Number
})
// the food modle can connect with the node js
const FoodModle=mongoose.model("foods",FoodSechma);
exports.FoodModle=FoodModle;
// function of valid - params - befor wr get to mongo data
exports.validFood=(_bodyData)=>{
    let joiSechma=Joi.object({
        // what is must and how it should be
        name:Joi.string().min(2).max(20).required(),///must
        img:Joi.string().min(2).max(299).allow(null,""),////
        cal:Joi.number().min(1).max(999).required(),///must
        price:Joi.number().min(1).max(999).required(),///must

    })
    return joiSechma.validate(_bodyData);
}