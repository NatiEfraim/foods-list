// index router
// diffine express and router
const exprees =require("express");
const router=exprees.Router();
router.get("/",(req,res)=>{
        // what return on format of json
        res.json({msg:"hello from express"})
})
module.exports=router;