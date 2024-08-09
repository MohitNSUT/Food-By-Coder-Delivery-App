import foodModel from "../models/foodModel.js"
import fs from 'fs'

//add food item
const addFood = async(req,resp)=>{
     
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        resp.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log("some error is found please check")
        resp.json({success:false,message:" Food not Added due to some error"})
    }

}

// all food list
const listFood = async(req,resp)=>{
    try{
        const foods = await foodModel.find({});  //{} means no conditions and hence fetch all the items
        resp.json({success:true,data:foods});
    }
    catch(error){
        resp.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async(req,res)=>{
    try{
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`,(err)=>{
            if(err){
                console.log("file not deleted due to some error")
            }
            else{
                console.log("file is deleted successfully");
            }
      });
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"food removed"})
    }
   catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
   }
}

export {addFood,listFood,removeFood}