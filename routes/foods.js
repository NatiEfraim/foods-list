// foods router
// diffine express and router
const exprees = require("express");
// get the FoodModle
const { FoodModle, validFood } = require("../models/foodModel");
const router = exprees.Router();
// get req
router.get("/", async (req, res) => {
  // doing request "api"
  let data = await FoodModle.find({}).sort({_id:-1}); ///find all data in collection
  // what return on format of json
  res.json(data);
});
// post req - add prod to mongo data
router.post("/", async (req, res) => {
  // req.body - all data. from user
  //   befor we turn for asking the data - we valid the prod
  let validBodyData = validFood(req.body);
  if (validBodyData.error) {
    // has been error
    return res.status(400).json(validBodyData.error.details);
  }
  //   show me hat you get from postman
  //   res.json(req.body);
  let foodProd = new FoodModle(req.body); ///complete all data into food
  await foodProd.save(); //save all date you got
  res.json(foodProd); ///add to mongoDB - exprees0 - collections - foods
});
// delete req
router.delete("/:idDel", async (req, res) => {
  try {
    // req to delete from mongo db
    let data = await FoodModle.deleteOne({ _id: req.params.idDel });
    // if has seccess --> deleteCount=1
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
// edit req
router.put("/:idEdit", async (req, res) => {
  //   befor we turn for asking the mpngo db - we valid the prod datails
  let validBodyData = validFood(req.body);
  if (validBodyData.error) {
    // has been error - not match all details according sechma!!!
    return res.status(400).json(validBodyData.error.details);
  }
  try {
    // req to updata from mongo db
    let data = await FoodModle.updateOne({ _id: req.params.idEdit },req.body);
    // if has seccess --> deleteCount=1
    res.json(data);///show me all data after change details in data.
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
