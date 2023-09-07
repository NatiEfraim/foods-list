// shop router

// diffine express and router
const exprees =require("express");
const { prods_ar}=require("../data/shopData");///connected for the data
const router=exprees.Router();
router.get("/",(req,res)=>{
        // what return on format of json
        res.json(prods_ar)
})
// diffine router of /shop/category - query string
// http://localhost:3000/shop/category/?category=animals
router.get("/category",(req,res)=>{

    let idItem=req.query.category;///collect qury string.
    console.log(idItem);
    // // filter the data.cat==idItem
    let item=prods_ar.filter(item=>{
        return item.cat==idItem;
    })
    console.log(item);
    // what return on format of json
    res.json(item);
})

// diffine router of /shop/category - params
// http://localhost:3000/shop/category/foods

router.get("/category2/:catName",(req,res)=>{

    let idItem=req.params.catName;///collect qurey params
    console.log(idItem);
    // res.json({msg:`lokking for ${idItem}`});
    // // filter the data.cat==idItem
    let item=prods_ar.filter(item=>{
        return item.cat==idItem;
    })
    // console.log(item);
    // what return on format of json
    res.json(item);
})
// diffine router of /shop/query - query string
// http://localhost:3000/shop/query/?query - min
router.get("/query",(req,res)=>{

    let idItem=req.query.min;///collect qury string.
    
    console.log(idItem);
    // res.json(idItem);

    // // filter the data.cat==idItem
    let item=prods_ar.filter(item=>{
        return Number(item.price) >=idItem;
    })
    console.log(item);
    // what return on format of json
    res.json(item);
})
// diffine router of /shop/single prod - params
// http://localhost:3000/shop/single/:id
router.get("/single/:id",(req,res)=>{

    let idItem=req.params.id;///collect id params
    console.log(idItem);


    // res.json({msg:`lokking for ${idItem}`});
    // // find the data.cat==idItem
    let item=prods_ar.filter(item=>item.id==idItem)
    console.log(item);
    // what return on format of json
    res.json(item);
})
module.exports=router;