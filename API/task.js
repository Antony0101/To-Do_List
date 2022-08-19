import express from 'express';
import passport from 'passport';
import {TaskModel} from '../database';


const Router = express.Router();


/*
Api         post
path        /create
desc        create a new task
params      none
access      token
 */
Router.post("/create",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        //await validateSignup(req.body.task);
        const task = req.body.task;
        task.user=req.user._id;
        const newtask = await TaskModel.create(task);
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Api         get
path        /
desc        display all tasks
params      none
access      token
 */
Router.get("/",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json({message:"success",tasks});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Api         get
path        /report
desc        display task report
params      none
access      token
 */
Router.get("/",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;