import express from 'express';
import {UserModel} from '../database';
import passport from 'passport';
import {validateSignin,validateSignup} from '../validation/auth';


const Router = express.Router();


/*
Api         post
path        /signup
desc        signup route
params      none
access      all
 */
Router.post("/signup",async (req,res)=>{
    try {
        await validateSignup(req.body);
        const user = req.body;
        await UserModel.userShouldNotExist(user);
        const newuser = await UserModel.create(user);
        const token = await UserModel.generateToken(newuser._id);
        return res.status(200).json({message:"success",token});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});


/*
Api         post
path        /signin
desc        signin route
params      none
access      all
 */
Router.post("/signin",async (req,res)=>{
    try {
    await validateSignin(req.body);
    const user = await UserModel.findByIdAndPassword(req.body);
    const token = await UserModel.generateToken(user._id);
    return res.status(200).json({message:"success",token});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});

export default Router;


/*
Api         post
path        /signout
desc        signout route
params      none
access      token
 */
Router.post("/signout",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        await UserModel.updateOne({_id:user[0]._id},{$pull:{token_id:user[1]}});
        const u = await UserModel.findOne({$and:[{_id: user[0]._id},{token_id:user[1]}]});
        if(u) throw new Error("signout failed")
        return res.status(200).json({message:"success"});
        }
        catch (error) {
            return res.status(500).json({ message:"failed", error: error.message });
        }
});


/*
Api         post
path        /signoutall
desc        signout all tokens
params      none
access      token
 */
Router.post("/signoutall",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        await UserModel.updateOne({_id:user[0]._id},{$set:{token_id: []}});
        const u = await UserModel.findOne({$and:[{_id: user[0]._id},{token_id:user[1]}]});
        if(u) throw new Error("signout failed")
        return res.status(200).json({message:"success"});
        }
        catch (error) {
            return res.status(500).json({ message:"failed", error: error.message });
        }
});