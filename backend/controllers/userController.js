import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from "validator"
import jwt from 'jsonwebtoken'

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user doesnot exist"})
        }
        const isMatch  = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Wrong password"})
        }

        const token = createToken(user._id);
        res.json({suceess:true,token})
    }
    catch(error){
       console.log(error)
       res.json({success:false,message:"some error found while login"}); 
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// ragister user
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body);

    try{
        // check user already exist or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exist" })
        }

        // validating email address format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // validating password
        if(!password || password.length < 8){
            return res.json({success:false,message:"Please enter a strong password of atleast 8 characters"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedpassword 
        })

       const user = await newUser.save();
       const token = createToken(user._id);
       res.json({suceess:true,token})
        

    }   
    catch(error){
        console.log(error);
         res.json({success:false,message:"Error hmm"})
    }   
}
  
export {loginUser,registerUser}